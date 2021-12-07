const { check } = require('express-validator');


module.exports = [

    check('email')
    .notEmpty().withMessage('ingrese un email')
    .isEmail().withMessage('Ingrese un email valido'),

    check('name')
    .isLength({ min : 6, max : 16 }).withMessage('Ingrese un nombre entre 6 y 16 caracteres'),
    

    check('color').notEmpty().withMessage('Seleccione un color'),

    check('edad')
    .notEmpty().withMessage('Ingrese un numero')
    .isInt().withMessage('Ingrese un numero')
]