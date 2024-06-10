import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useContext } from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../theme";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import secureLocalStorage from "react-secure-storage";
import { ADMIN_ROLE, SELLER_ROLE } from "../constants/userRoles";
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux";
// import { ThemeContext } from "../Theme";

const Header = () => {
    //   const { toggleTheme,isDarkMode } = useContext(ThemeContext);
    const { toggleTheme } = useContext(ThemeContext);
    const productsInCart = useSelector((state) => state.cart.products);
    let countOfProduct =productsInCart.length;
    const userRole = secureLocalStorage.getItem('userRole');
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <Link to={"/"} > */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
                        My E-Commerce App
                    </Link>
                </Typography>
                {userRole == SELLER_ROLE && (
                    <>
                        {" "}
                        <Button color="inherit" component={Link} to="/seller/product">
                            Products
                        </Button>
                    </>

                )}
                {userRole == ADMIN_ROLE && (
                    <>
                        <Button color="inherit" component={Link} to="/all-user">
                            All users
                        </Button>
                    </>

                )}


                <Button color="inherit" component={Link} to="/orders">
                    Orders
                </Button>

                <Badge badgeContent={countOfProduct} color="error">
                    <Button color="inherit" component={Link} to="/cart">
                        Cart
                    </Button>
                </Badge>
                {/* </Link> */}
                <IconButton color="inherit" onClick={toggleTheme} edge="end">
                    {/* {isDarkMode? <Brightness7Icon /> : <Brightness4Icon />} */}
                    {<Brightness7Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;