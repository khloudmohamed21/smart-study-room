const { body } = require('express-validator');

module.exports=[

  body('email').isEmail(),
  body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  
]