var express = require('express');
var router = express.Router();
const { login, loginProcess, user, logout } = require('../controllers/main')

/* validators */
const loginValidator = require('../validations/loginValidator');
/* middlewares */
const usersCheck = require('../middlewares/usersCheck');

/* GET home page. */
router.get('/', login);
router.post('/', loginValidator, loginProcess);
router.get('/user',usersCheck, user);
router.get('/logout', logout);

module.exports = router;
