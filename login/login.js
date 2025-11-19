const Userdb = require('../USERS/Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const access_Token = process.env.access_token;

const login = async (req,res) =>{
    const {name,pwd} = req.body;
    try {
        const user = await Userdb.findOne({name:name});
        if(!user){
            return res.status(401).json({'message':'Invalide credencials'});
        }
        const checkpwd = await bcrypt.compare(pwd,user.password);
        if(!checkpwd){
            return res.status(401).json({'message':'Invalide credencials'});
        }

       const roles = Object.values(user.roles);
        const payload = {
            "userId":user.id,
            "name":user.name,
            "roles": roles
        };

        const token = jwt.sign(payload,access_Token,{expiresIn: '1h'})
        res.json({token})
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = login;