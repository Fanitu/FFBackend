const UserDb = require('../USERS/Model/userModel');
const bcrypt = require('bcrypt');

const registrate = async (req,res)=>{
    try {
        const {name,phone,pwd} = req.body;

          if(!name || !phone || !pwd) 
            return res.status(400).json(
             {
            succes:false,
            "message":'name phone and password are required.'
            }
           );
            const salt = 10;

            const hashedPassword = await bcrypt.hash(pwd,salt)
                const newUser = await UserDb.create({
                    name,
                    phone,
                    password:hashedPassword,
                    roles: {
                        "User":1111
                    }
                });
                console.log(newUser.name,newUser.phone);
        res.status(201).json(
                {   success:true,
                    "Message":`New User ${newUser.name} ${newUser.phone} created Succesfully`
                }
            );
        console.log(newUser)
    } catch (error) {
         console.error("message",error.message);
    }

};

module.exports = registrate;