const { body } = require('express-validator');

module.exports=[
  body('fname').matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
  body('lname').matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
  body('email').isEmail(),
  body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
]