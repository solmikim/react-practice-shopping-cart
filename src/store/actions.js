import { SET_USER, ADD_SHOPPING_CART, REMOVE_SHOPPING_CART} from '../constants/ReducerActionTypes';

export const setUserInformation = (userInformation) => {
    return {
        type : SET_USER,
        payload : userInformation
    }
}

export const addProductToShoppingCart = (item) => {
    return {
        type : ADD_SHOPPING_CART,
        payload : item
    }
}

export const removeProductToShoppingCart = (item) => {
    return {
        type : REMOVE_SHOPPING_CART,
        payload : item
    }
}
