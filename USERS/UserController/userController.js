const UserDb = require('../Model/userModel');

  
const getUsers = async (req,res)=>{
    
        try {
            const allUsers = await UserDb.find()
            res.status(200).json({"All Users":`${allUsers}`});
        } catch (error) {
            console.log(error);
        }
}


   const updateUser = async (req,res) => { 
    try {
        const userId = req.user.userId;

    if(!userId) return res.sendStatus(400);
    
    const updateUser = await UserDb.findOneAndUpdate(
        {_id:userId},
        {name:req.body.name,phone:req.body.phone},
        {new:true}
    );
    if(!updateUser){
        return res.status(404).json({"message":`user with firstname ${req.user.name} not Found`})
    }
    res.json({"message":`User Updated Succesfully ${updateUser}`})

    } catch (error) {
        console.log(error);
    }}

const deleteUser = async (req,res)=>{

    try {
        const user = UserDb.findOne({name:req.body.name});
        if(!user) return res.status(404).json({'message':`${user} not found`});
        const deleteduser = await UserDb.deleteOne({name:req.body.name});
        if(deleteduser.deletedCount === 0){
            return res.status(500).json({'message':`Error deleting user ${req.body.name}`})
    }
    res.json({'message':'User Deleted Succesfully!'});

    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    getUsers,
    updateUser,
    deleteUser
}