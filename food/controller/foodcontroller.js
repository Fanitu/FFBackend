const foodDB = require('../model/foodmodel');


const getAllFoods = async (req, res) => {
    try {
        const foods = await foodDB.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFoodById = async (req, res) => {
    try {
        const food = await foodDB.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food item not found' });
        
        res.status(200).json(food);

     } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createFood = async (req, res) => {
     const { name, price, catagory } = req.body;

     if(!name || !price || !catagory) return res.status(400).json({message:"All fields are required"});
     
    try {
        const newFood = await foodDB.create({
            name,
            price,
            catagory,
            isAvailable:true
        },{new:true});
        res.status(201).json({
            message: `Food item ${newFood.name} created successfully`,
            food: newFood
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFood = async (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({message:"Food id is required"});

    try {
        const updatedFood = await foodDB.findByIdAndUpdate({_id:id}, req.body, {new:true});
        res.status(200).json({
            message: `Food item updated successfully`,
            food: updatedFood
        });
    } catch (error) {
        
    }
};

const deleteFood = async (req, res) => {
    const {id} = req.params;

    if(!id) return res.status(400).json({message:"Food id is required"});
    try {
        const deletedFood = await foodDB.findByIdAndDelete({_id:id});
        res.status(200).json({
            message: `Food item deleted successfully`,
            food: deletedFood
        }, {new:true});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood
};