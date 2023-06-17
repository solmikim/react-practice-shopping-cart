import { SET_USER} from '../constants/ReducerActionTypes';

export const setUserInformation = (userInformation) => {
    return {
        type : SET_USER,
        payload : userInformation
    }
}