const { validationResult } = require('express-validator');
const userModel = require('../../models/user.model');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

module.exports=async (req, res) => {

    const {fname, lname, email, password, confirmPassword} = req.body
    try {
        const registerErrors = validationResult(req);
        if (registerErrors.isEmpty()) {
          // check if email exist 
            const user = await userModel.findOne({ email });
            if (user) {
                res.json({message:'email is exist', oldInputs:{fname, lname, email, password, confirmPassword}}) 
            } else {
                // hash password before insert 
                bcrypt.hash(password, 7, async function(err, hash) {
                // Store hash in your password DB.
                if (err) {
                    res.json({message:'hash error'})
                } else {
                    // insert data in DB
                    await userModel.insertMany({
                        fname, lname, email, password:hash
                    })
                    var token = jwt.sign({ email }, 'secret');
                    let transporter = nodemailer.createTransport({
                        host: "smartstudyroom21@gmail.com",
                        service: 'gmail',
                        port: process.env.PORT || 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: "smartstudyroom21@gmail.com", // generated ethereal user
                            pass: "smartstudyroom21@admin", // generated ethereal password
                        },
                    });

                  // send mail with defined transport object
                    await transporter.sendMail({
                      from: 'smartstudyroom21@gmail.com', // sender address
                      to: email, // list of receivers
                      subject: "Hello ✔", // Subject line
                      text: "Hello world?", // plain text body
                      html: `<a href="https://studyroomfinalproject.herokuapp.com/checkemail/${token}">Confirm</a>`, // html body
                    });
                    res.json({message:'valid data'})
                }
            });
                res.json({message:'valid data'})
            }
        } else {
            res.json({message:'in-valid data', messageError:registerErrors.errors})
        }
    } catch (error) {
        res.json({message:'catch in-valid error'})
    }

}