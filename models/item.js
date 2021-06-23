const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const itemSchem=new Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const Item=mongoose.model('Item',itemSchem);
module.exports=Item;