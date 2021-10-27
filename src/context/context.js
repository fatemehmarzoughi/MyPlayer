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
})