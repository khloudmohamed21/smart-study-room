const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = async (req,res)=>{
        const{ email, password } = req.body
        try {
            const signinErrors = validationResult(req);
            if (signinErrors.isEmpty()) {
              // check if user exist
                const user = await userModel.findOne({email}) 
                if (user) {
                    if(user.confirmed){
                        const match = await bcrypt.compare(password,user.password);
                        if (match) {
                            const token = jwt.sign({user_id:user._id , userName: user.fname, isLoggedIn:true, userRole:user.role}, 'secret')
                            res.json({ message: "done", token })
                        } else {
                            res.json({message:'invaild password' ,oldInputs:{email, password }})
                        }
                    } else {
                        res.json({ message: "please confirm u email first  ", oldInputs: { email, password } })
                    }

                } else {
                    res.json({message:'invaild email' ,oldInputs:{email, password }})
                }
            } else {
                res.json({message:'in-valid data',oldInputs:{email, password },messageError:signinErrors.array()})
            }
        } catch (error) {
            res.json({message:'catch signin error'})
        }
}