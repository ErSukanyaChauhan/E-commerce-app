const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{type:Number, default:1},
        },

    ],
});

const addCartProduct = async(req,res)=>{
  const userId = req.params.userId;
  
}

const Cart =mongoose.model("Cart",cartSchema);
module.exports= Cart;