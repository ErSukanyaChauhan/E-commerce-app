const { json } = require("body-parser");
const Cart = require("../models/cartModel");

const userCart = async (req, res) => {

    const userId = req.params.userId;

    // let cartData = await Cart.find({ userId: userId }).populate('items.productId');
    // while using find because it returns an array so we have to find the length 
    // while usinf findOne we dont need because it returns an object

    let cartData = await Cart.findOne({ userId: userId }).populate('items.productId');
    if (!cartData) {
        return res.send("Cart does not found");
    }
    res.json(cartData);
};

const addCartProduct = async (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    try {

        let cart = await Cart.findOne({ userId });
        console.log("cart", cart);
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        //let existingCart;
        //Check if the product in cart 

        const existingItem = cart.items.find((item) =>
            item.productId.equals(productId));
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({ productId, quantity: quantity || 1 });
            console.log("else part")
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        //const userId = req.params.userId;

        const { userId, productId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.send("Cart does not found");
        }

        console.log(cart, 'before');
        let result = cart.items.filter(
            (eachProduct) => eachProduct.productId != productId
        );
        cart.items = result;
        await cart.save();
        res.json(cart);
    }
    catch (error) {
        res.send(error);
    }
};

//update item

const updateCartItem = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantityToRemove } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: "cart not found" });
        }
        //Find the item in cart
        let cartItem = cart.items.find((item) => item.productId.equals(productId));

        if (!cartItem) {
            return res.status(404).json({ error: "Item not found in the cart" });
          }
      
        // Decrement the quantity or remove the item if quantityToRemove is greater than or equal to the current quantity
        if (quantityToRemove && quantityToRemove < cartItem.quantity) {
            cartItem.quantity -= quantityToRemove;
        } else {
            // If quantityToRemove is not specified or greater/equal to current quantity, remove the entire item
            cart.items = cart.items.filter(
                (item) => !item.productId.equals(productId)
            );
        }
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" })
    }
}
module.exports = {
    userCart, addCartProduct, removeItemFromCart, updateCartItem
}