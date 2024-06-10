
export const ProductActionKeys = {
    SET_PRODUCT: 'SET_PRODUCT',
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    INCREASE_QUANTITY: "INCREASE_QUANTITY",
    DECREASE_QUANTITY: "DECREASE_QUANTITY"
}
//useDispatch

export const setProducts = (products) => ({
    type: ProductActionKeys.SET_PRODUCT,
    payload: products,
});

// export const setLoading =() =>({
//     type:"SET_Loading",
//   });

//   export const setError =(error) =>({
//     type:"SET_Error",
//     payload:error,  
//   });

export const removeFromCart = (productId) => ({
    type: ProductActionKeys.REMOVE_FROM_CART,
    payload: productId,
});

export const increaseQuantity = (productId) => ({
    type: ProductActionKeys.INCREASE_QUANTITY,
    payload: productId,
});

export const decreaseQuantity = (productId) => ({
    type: ProductActionKeys.DECREASE_QUANTITY,
    payload: productId,
});