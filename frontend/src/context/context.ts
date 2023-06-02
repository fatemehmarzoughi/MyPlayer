import React from "react";


export type ContextType = {
  isRotate: boolean,
  setIsRotate: (value: boolean) => void,

  isLogin: boolean,
  setIsLogin: (value: boolean) => void,

  // just a temporary state
  accessToken: string,
  setAccessToken: (value: string) => void,

  isFirstInstallation: boolean,
  setIsFirstInstallation: (value: boolean) => void,

  userName: string,
  setUserName: (value: string) => void,

  userCountry: string,
  setUserCountry: (value: string) => void,

  userEmail: string,
  setUserEmail: (value: string) => void,

  userImage: string,
  setUserImage: (value: string) => void,

  theme: boolean,
  setTheme: (value: boolean) => void,

  isAuthPage: boolean,
  setIsAuthPage: (value: boolean) => void,
}


export default React.createContext({
  isRotate: false,
  setIsRotate: (value: boolean) => {},

  isLogin: false,
  setIsLogin: (value: boolean) => {},

  // just a temporary state
  accessToken: "",
  setAccessToken: (value: string) => {},

  isFirstInstallation: false,
  setIsFirstInstallation: (value: boolean) => {},

  userName: "",
  setUserName: (value: string) => {},

  userCountry: "",
  setUserCountry: (value: string) => {},

  userEmail: "",
  setUserEmail: (value: string) => {},

  userImage: "",
  setUserImage: (value: string) => {},

  theme: true,
  setTheme: (value: boolean) => {},

  isAuthPage: false,
  setIsAuthPage: (value: boolean) => {},
});
