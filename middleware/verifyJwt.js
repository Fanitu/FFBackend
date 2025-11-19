const jwt = require('jsonwebtoken');
const access_Token = process.env.access_Token;

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
     
    if(!token) return res.status(401).json({"message":"Invalide token"});
    
    jwt.verify(token,access_Token,(err,user)=>{
        if(err) return res.status(401);
            req.user = user;
            req.roles = user.roles;
            next()
    });
};

module.exports = verifyToken;