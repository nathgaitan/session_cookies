const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const colores = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','colores.json'),'utf-8'));

module.exports = {
    
    login: (req, res) => {
        return res.render('login', { title: 'Logeo'});
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const { name, email, edad, color } = req.body;

            let a = colores.find(colore => color == colore.tonalidad);
            let colorNombre = a.nombre;

            
            req.session.userLogin = { 
                name : name.trim(), 
                email : email.trim(), 
                edad : edad.trim(), 
                color, 
                colorNombre
            };
            if(req.body.recordar) {
                res.cookie("color", req.session.userLogin, {maxAge:1000 * 60});
            }
            
            res.send( `
            <html>
            <head>
            <link rel='stylesheet' href='/stylesheets/styles.css'>
            </head>
            <body class="exitoso" style="background-color: ${ color };">
            <header><a href="/logout">Cerrar sessión</a></header>
            <main>
            <section>
            <article class="mensaje">
            <p styles="text-align: justify;">Hola ${ name }, elegiste el color: ${ colorNombre }, tu email es:
            ${ email } y tu edad es: ${ edad }.</p>
            </article>
            <article class="linkeo">
            <p>Ingresa <a href="/user">aquí</a> para la bienvenida.</p>
            </article>
            </section>
            </main>
            </body>
            </html>
            `)
        } else {
            return res.render('login', {
                title: 'Logeo',
                errores: errors.mapped(),
                old: req.body
            })
        }

    },
    user: (req, res) => {
        res.render('homeUser', { 
            title : "Vista usuario"
    })
    },
    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}