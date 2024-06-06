const express = require('express');
const { userCart,addCartProduct,removeItemFromCart, updateCartItem } = require('../controllers/cartController');
const router = express.Router();

// router.get('/:userId',userCart);
router.get('/user/:userId',userCart);
router.post('/user/:userId',addCartProduct);

//remove items from cart
router.delete('/remove/:userId/:productId',
   // authCheck,
  removeItemFromCart);

//update quantityin cart ???   work not complete

router.patch("/remove/:userId/:productId",updateCartItem);

module.exports = router