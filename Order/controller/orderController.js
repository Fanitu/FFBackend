const OrderDb = require('../model/OrderModel');

const handleNewOrder = async (req,res)=>{
    
     try {
    const userId = req.user.userId;
    const {product,total} = req.body;

    if(!product || !total || !userId ) return res.status(400).json({"message":'Product and total price is required.'});

   
        const newOrder = await OrderDb.create({
        product,
        total,
        user:userId,
        status:"pending"
    });
   res.status(201).json({"Message":`New created Succesfully ${newOrder}`});
   console.log(newOrder);
        
    } catch (error) {
        console.error("message",error.message);
    }
   
}; 

const updateOrder = async (req,res) => {
    try {
         const {id} = req.params;
            console.log(id);
        if(!id) return res.sendStatus(400);
            
         const updatedOrder = await OrderDb.findOneAndUpdate(
                {_id:id},
                {status:req.body.status},
                {new:true}
            );
        if(!updatedOrder){
                return res.status(404).json({"message":`order with id ${id} not Found`})
            }
            res.json({"message":`User Updated Succesfully ${updatedOrder}`})

        
    } catch (error) {
        console.error(error);
    }

};

const deleteOrder = async (req,res)=>{

    try {
    const userId = req.user.userId;
    const {id} = req.params;
     if(!id) return res.status(404).json({'message':`${id} not found`});
            const deleteduser = await OrderDb.deleteOne({_id:id,user:userId});
            if(deleteduser.deletedCount === 0){
                return res.status(500).json({'message':`Error deleting user order with id ${id}`});
            }
    res.json({'message':'order Deleted Succesfully!'});

    } catch (error) {
        console.error(error);
    }

};

const getAllOrders = async (req,res)=>{
    const allOrders = await OrderDb.find()
    res.status(200).json({"All Users":`${allOrders}`});
};



module.exports = {
    handleNewOrder,
    updateOrder,
    deleteOrder,
    getAllOrders
}