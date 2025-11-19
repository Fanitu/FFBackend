const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
     product:{
        type:Array,
        required:true,
    },
     total:{
        type:Number,
        required:true
    },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
     },
     status:{
        type:String,
        enum:['pending','confirmed','preparing','ready','complete','cancel'],
        default:'pending'
     }},{
    timestamps:true
});

module.exports = mongoose.model('Order',OrderSchema)