import { ADD_SHOPPING_CART, SET_USER, REMOVE_SHOPPING_CART} from '../constants/ReducerActionTypes';

const initialState = {
    cartItemCount : 0,
    userInformation : null,

}

export default function reducer(state = initialState, action){

   console.log('reducer!!!!', state.userInformation, action)
    switch(action.type){
        case ADD_SHOPPING_CART : return {
            ...state,
            cartItemCount : action.payload
        }
        case REMOVE_SHOPPING_CART : return {
            ...state,
            cartItemCount : action.payload
        }
        case SET_USER : return {
            ...state,
            userInformation : action.payload
        }
    }
    
    return state;
  }