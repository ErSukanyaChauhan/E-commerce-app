import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import HomePage from "./components/homePage";
import axios from "axios";
import LoginPage from "./components/loginPage";
import RegisterForm from "./components/registerForm";
import SellerProductPage from "./components/seller-product-page";
import AddNewProduct from "./components/addNewProduct";

function App() {
  // useEffect(() => {
  //   const fetchProductsData= async () => {
  //     let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`);
  //     console.log(res.data);
  //   };
  //   fetchProductsData();
  // }, []);

  return (
    <>
      {/* <Header /> */}

      <BrowserRouter>
        <Routes>
           <Route element={<HomePage/>} path = "/" />
           <Route element={<LoginPage/>} path = "/login" />
           <Route element={<RegisterForm/>} path = "/register" />
           <Route element={<SellerProductPage/>} path = "/seller/product" />
           <Route element={<AddNewProduct/>} path = "/seller/product/add" />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
