const app = require('express').Router();

//validation
const validationSignUp = require('../middleware/validation/register.valid');

//controller
const signUpController = require('../controller/registeration/register.controller');
const checkmailController = require('../controller/registeration/checkmail.controller');

//register end point ..
app.post('/handleSignUp',validationSignUp, signUpController);

//checkmail end point ..
app.get('/checkemail/:token', checkmailController);



module.exports = app;