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
import NotFound from "./components/NotFound";
import PrivateRouteComponent from "./components/privateRoute";
import LearningHoc from "./learningHoc";
import secureLocalStorage from "react-secure-storage";
import { SELLER_ROLE } from "./constants/userRoles";

function App() {
  // useEffect(() => {
  //   const fetchProductsData= async () => {
  //     let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`);
  //     console.log(res.data);
  //   };
  //   fetchProductsData();
  // }, []);
  const userRole = secureLocalStorage.getItem('userRole');
  return (
    <>
      {/* <Header /> */}

      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<LearningHoc />} path="/learning" />
          <Route
            element={
              <PrivateRouteComponent userCondition={userRole == SELLER_ROLE} />}
          >
            <Route element={<SellerProductPage />} path="/seller/product" />
            <Route element={<AddNewProduct />} path="/seller/product/add" />
            <Route element={<AddNewProduct />} path="/seller/product/edit/:productId" />
          </Route>
          <Route element={<NotFound />} path="*" />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
