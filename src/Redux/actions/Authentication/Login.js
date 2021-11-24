import { LOGIN_SUCCESS, LOGIN_FAIL } from '../../reducers/index';

export const login = () => {
    return (dispatch) => {
        // do it with api calls
        const status = 404;
        if(status === 200)
            dispatch({ type : LOGIN_SUCCESS });
        else 
            dispatch({ type : LOGIN_FAIL });
    }
}