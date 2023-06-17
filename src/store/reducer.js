import { ADD_COUPONS, ADD_PRODUCT_ITEMS, ADD_SHOPPING_BAG, SET_USER} from '../constants/ReducerActionTypes';

const initState = {
    coupons : null,
    products : null,
    userInformation : null
}

export default function reducer(currentState = initState, action){

//    console.log('reducer!!!!', currentState, action)
    switch(action.type){
        case ADD_PRODUCT_ITEMS: {
            currentState.products = action.payload;
        }
        case SET_USER : {
            currentState.userInformation = action.payload;
        }
    }
    
    return currentState;
  }