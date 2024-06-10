import * as  yup from "yup";
import {
    Button,
    Container,
    Grid, TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Header from "./header"
import SellerProductsPage from "./seller-product-page"
import react, { useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolverS/yup";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object().shape({
    name: yup.string().required("Product Name is required"),
    description: yup.string().required("Description is required"),
    price: yup
        .number()
        .required("Price is required")
        .min(5, "Value must be greater than 5"),
    // .positive('Price must be positive'),
    stock: yup
        .number()
        .required("Stock is required")
        .integer("Stock must be an integer")
        .positive('Stock must be positive'),
    category: yup.string().required("Color is required"),
    color: yup.string().required("Color is required"),
    size: yup.string().required("Size is required"),
    //image: yup.mixed().required("Image is required")
})

const SellerAddProductPage = ({ history }) => {
    const { productId } = useParams();

    const navigate = useNavigate();

    const fetchProductbyId = async (proId) => {
        let response = await axios.get(`${BACKEND_URL}/product/${proId}`);

        let productData = response.data;
        setValue("name", productData.name);
        setValue("category", productData.category);
        setValue("description", productData.description);
        //setValue("color",productData.color);
        setValue("price", productData.price);
        setValue("stock", productData.stock);
        setValue("color", productData.attributes[0].value);
        setValue("size", productData.attributes[1].value);

    }
    useEffect(() => {
        if (productId) {
            fetchProductbyId(productId);
        }
    }, [productId])
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const token = Cookies.get("authToken");
            const formData = new FormData();

            // formData.append("name", data.name);
            // formData.append("description", data.description);
            // formData.append("price", data.price);
            // formData.append("stock", data.stock);
            // formData.append("category", data.category);
            // formData.append("color", data.color);
            // formData.append("size", data.size);
            // formData.append("image", data.image[0]);
            const attributes = [
                { name: "Color", value: data.color },
                { name: "Size", value: data.size }
            ]
            const dataObj = {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category,
                attributes: [
                    { name: attributes[0].name, value: attributes[0].value },
                    { name: attributes[1].name, value: attributes[1].value }
                ],

            };
            //const newObj = {data:JSON.stringify(dataObj)};
            let response;
            let config = {
                headers: {
                    Authorization: token
                }
            };
            if (productId) {
                response = await axios.put(`${BACKEND_URL}/product/${productId}`, dataObj, config)
            } else {
                response = await axios.post(
                    `${BACKEND_URL}/product`,
                    { data: dataObj }, config
                );

            }
            if (response.status == 200) {
                toast.success(response.data.message, {
                    position: "top-right",
                });
                setTimeout(() => {
                    navigate("/seller/product");
                }, 1000);
            } else {
                toast.error("Not Worked", {
                    position: "top-right",
                });
            }

        } catch (error) {
            console.error("Error Adding Product", error)
        }
    }
    //console.log(watch("example"))
    // watch input value by passing the name of it
    return (

        <>
            <Header />
            <Container>
                <Typography variant="h5" gutterBottom>

                    {productId ? (
                        "Edit Product"
                    ) : (
                        "Add New Product"
                    )}
                </Typography>

                {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {/* Product name*/}
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        label="Product Name"
                                        varient="outlined" {...field}
                                        error={!!errors.name}
                                        helperText={errors.name?.message} />
                                )}
                            />
                        </Grid>
                        {/* Product description*/}
                        <Grid item xs={12}>
                            <Controller
                                name="description"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        label="Product Description"
                                        varient="outlined" multiline rows={4}
                                        {...field}
                                        error={!!errors.description}
                                        helperText={errors.description?.message} />
                                )}
                            />
                        </Grid>

                        {/* Product price*/}
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="price"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        label="Price"
                                        varient="outlined" type="number"
                                        {...field}
                                        error={!!errors.price}
                                        helperText={errors.price?.message} />
                                )}
                            />
                        </Grid>

                        {/* Product stock*/}
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="stock"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        label="Stock"
                                        varient="outlined" type="number"
                                        {...field}
                                        error={!!errors.stock}
                                        helperText={errors.price?.message} />
                                )}
                            />
                        </Grid>
                        {/* Product category*/}
                        <Grid item xs={12} >
                            <Controller
                                name="category"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        label="Category"
                                        varient="outlined"
                                        {...field}
                                        error={errors.category}
                                        helperText={errors.category?.message} />
                                )}
                            />
                        </Grid>
                        {/* Product color*/}
                        <Grid item xs={12} >
                            <Controller
                                name="color"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        label="Color"
                                        varient="outlined"
                                        {...field}
                                        error={!!errors.color}
                                        helperText={errors.color?.message} />
                                )}
                            />
                        </Grid>
                        {/* Product size*/}
                        <Grid item xs={12} >
                            <Controller
                                name="size"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        label="Size"
                                        varient="outlined"
                                        {...field}
                                        error={!!errors.size}
                                        helperText={errors.size?.message} />
                                )}
                            />
                        </Grid>

                        {/* Product Image*/}
                        <Grid item xs={12} >
                            <Controller
                                name="image"
                                control={control} defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth
                                        type="file"
                                        label="Image"
                                        varient="outlined"
                                        {...field}
                                        InputLabelProps={{ Shrink: true }}
                                        error={!!errors.image}
                                        helperText={errors.image?.message} />
                                )}
                            />
                        </Grid>
                        {/* Submit button*/}
                        <Grid item xs={12} >
                            {productId ? (
                                <Button variant="contained" color="primary" type="submit">
                                    Edit Product
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" type="submit">
                                    ADD Product
                                </Button>
                            )}


                        </Grid>
                    </Grid>
                </form>
                <Toaster />
            </Container>

        </>

    );
};

export default SellerAddProductPage;