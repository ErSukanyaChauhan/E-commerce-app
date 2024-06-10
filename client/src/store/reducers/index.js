import { combineReducers } from "redux";
import userReducer from "../actions/userActions";
import productsReducer from "./productsReducer";


const rootReducer = combineReducers({
    cart: productsReducer,
    user: userReducer
});

export default rootReducer;