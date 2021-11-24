import React from "react";

export default React.createContext({
    isRotate : false,
    setIsRotate : () => {},

    isLogin : false,
    setIsLogin : () => {},

    //just a temporary state
    accessToken : 0,
    setAccessToken : () => {},

    isFirstInstallation : false,
    setIsFirstInstallation : () => {},

    userName : '',
    setUserName : () => {}, 
    userCountry : '',
    setUserCountry : () => {}, 
    userEmail : '',
    setUserEmail : () => {}, 
    userImage : '',
    setUserImage : () => {},

    theme : true,
    setTheme : () => {},

    isAuthPage : false,
    setIsAuthPage : () => {},

})