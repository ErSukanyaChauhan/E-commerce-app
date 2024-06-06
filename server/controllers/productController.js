const ProductModel = require("../models/productModel");

const getProducts = async (req, res) => {
    try {
        //console.log("Testing api check");
        const products = await ProductModel.find();
        console.log("getProducts", products);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).send("internal server error");
    }
};

//get product by productId

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: "product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
}

// update product by Id
const updateProductById = async (req, res) => {
    try {
        console.log("data>>", req.body);
        let originalData = JSON.parse(req.body.data);
        let newData;
        if (req.file) {
            newData = { ...originalData, imageUrl: req.file.filename };
        } else {

            newData = { ...originalData };
        }
        const product = await ProductModel.findByIdAndUpdate(
            req.params.productId,
            newData,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
}

const addProduct = async (req, res) => {
    try {
        //let data = JSON.parse(req.body.data);

        console.log("new check", req.body.data);
        let data = req.body.data;
        let newProductObj = { ...data,userId:req.userId};

        const newProducts = await ProductModel.create(newProductObj);
        res.json({newProducts,message:"Product added successfully"});
    } catch (error) {
        console.log("error", error);
        res.status(404).send("internal server error");
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        let product = await ProductModel.findByIdAndDelete(productId);
        if (!product) {
            res.json({ Error: "Please provide correct id" });
        }
        res.json(product);
    } catch (error) {
        console.log("Error", error);
        res.status(404).send("Internal server error");
    }

}

const getProductBySellerId = async (req, res) => {
    try {
        console.log(req.params);
        const sellerId = req.userId;

        let allSellerProducts = await ProductModel.find({ userId: sellerId });
        res.status(200).json(allSellerProducts);
    }
    catch (error) {
        res.status(404).json({ message: 'Internal error occured' });
    }
}

module.exports = {
    getProducts, addProduct, deleteProduct, getProductById, updateProductById, getProductBySellerId
}