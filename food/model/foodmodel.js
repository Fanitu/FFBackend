const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
     name:{
        type:String,
        required:true,
        trim:true
    },
     price:{
        type:Number,
        required:true
    },
     catagory:{
        type:String,
        required:true,
        enum:['fata','juice','engeraneger','drinks']
    },
     isAvailable:{
        type:Boolean,
        default:true
     },
},{timestamps:true});

module.exports = mongoose.model('Food',FoodSchema)