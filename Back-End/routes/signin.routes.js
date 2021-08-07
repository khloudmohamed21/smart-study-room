const app = require('express').Router();

const validationSignIn = require('../middleware/validation/signIn.valid');
const signInController = require('../controller/signin.controller');

app.post('/handleSignIn', validationSignIn, signInController);



module.exports=app;