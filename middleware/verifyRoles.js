const verifyRoles = (...allowedRoles) => {
    
    return (req,res,next) =>{
         if(!req.roles ) return res.sendStatus(401);
         const rolesArray = [...allowedRoles];             
         const result = req.roles.map(role => {
           return rolesArray.includes(role)
    
        });
        const lastResult = result.find(val=> val === true)
         if(!lastResult) return res.sendStatus(401);
         next();
    }
}

module.exports = verifyRoles;