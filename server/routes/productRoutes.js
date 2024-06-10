const express = require('express');
const { getProducts, addProduct, deleteProduct, getProductById, updateProductById, getProductBySellerId } = require('../controllers/productController');
const authCheck = require('../middlewares/auth');
const roleGaurd = require('../middlewares/roleGaurd');
const upload = require('../middlewares/upload');
const router = express.Router();

router.get('/seller', authCheck, getProductBySellerId);

router.get('/',
//    authCheck,
    //roleGaurd(["seller", "admin"]),
    getProducts);

//get product by Id
router.get('/:productId', getProductById);

//update product by id
router.put('/:productId', 
authCheck,
//upload.single("image"),
updateProductById);

router.post('/',
    authCheck,
    // roleGaurd("seller"), 
    upload.single('image'), addProduct);
//delete product
router.delete('/:productId',
    // authCheck, roleGaurd("seller"), 
    deleteProduct);

module.exports = router;


