import { AppRegistry } from "react-native";

export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';


const inisialState = {
    otherStates : true,
    isLogin : null,
}

export const mainReducer = (state = inisialState , action) => {
    switch(action.type)
    {
      case LOGIN : 
      return {...state , isLogin : null};

      case LOG_OUT : 
      return {...state , isLogin : false};

      case LOGIN_SUCCESS : 
      return {...state , isLogin : true};

      case LOGIN_FAIL : 
      return {...state , isLogin : false};
  
      default : return state;
    }
}