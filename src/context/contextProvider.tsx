import React from "react";

import Context from "./context";
import { SITE_URL } from "src/assets";
import { getData, storeData } from "src/LocalStorage";

export type IContextProviderProps = {
  children: any
};
export type IContextProviderState = {
  isRotate: boolean;
  isLogin: boolean;
  accessToken: string;
  isFirstInstallation: boolean;
  userName: string;
  userCountry: string;
  userEmail: string;
  userImage: string;
  theme: boolean; // light = true , dark = false
  isAuthPage: boolean;
};
export default class ContextProvider extends React.Component<
  IContextProviderProps,
  IContextProviderState
> {
  constructor(props: IContextProviderProps) {
    super(props);

    this.state = {
      isRotate: false,
      isLogin: false,
      accessToken: "",
      isFirstInstallation: false,
      userName: "",
      userCountry: "Select Your Country",
      userEmail: "",
      userImage: `${SITE_URL}/images/makeURLs/default/png`,
      theme: true, // light = true , dark = false
      isAuthPage: false,
    };
  }

  override async componentDidMount() {
    try {
      const theme = await getData("theme");
      console.log("theme is = " + theme);
      theme === "true"
        ? this.setState({
            theme: true,
          })
        : this.setState({
            theme: false,
          });
    } catch (err) {
      console.log(err);
    }
  }

  setIsRotate = (value: boolean) => {
    this.setState({
      isRotate: value,
    });
  };

  setIsLogin = (value: boolean) => {
    this.setState({
      isLogin: value,
    });
  };

  setAccessToken = (value: string) => {
    this.setState({
      accessToken: value,
    });
  };

  setIsFirstInstallation = (value: boolean) => {
    this.setState({
      isFirstInstallation: value,
    });
  };

  setUserEmail = (value: string) => {
    this.setState({
      userEmail: value,
    });
  };

  setUserCountry = (value: string) => {
    this.setState({
      userCountry: value,
    });
  };

  setUserName = (value: string) => {
    this.setState({
      userName: value,
    });
  };

  setUserImage = (value: string) => {
    this.setState({
      userImage: value,
    });
  };

  setTheme = async () => {
    await storeData("theme", `${this.state.theme}`);
    this.setState({
      theme: !this.state.theme,
    });
  };

  setIsAuthPage = (isAuthPage: boolean) => {
    this.setState({
      isAuthPage,
    });
  };

  override render() {
    return (
      <Context.Provider
        value={{
          isRotate: this.state.isRotate,
          setIsRotate: this.setIsRotate,

          isLogin: this.state.isLogin,
          setIsLogin: this.setIsLogin,

          accessToken: this.state.accessToken,
          setAccessToken: this.setAccessToken,

          isFirstInstallation: this.state.isFirstInstallation,
          setIsFirstInstallation: this.setIsFirstInstallation,

          userName: this.state.userName,
          setUserName: this.setUserName,

          userEmail: this.state.userEmail,
          setUserEmail: this.setUserEmail,

          userCountry: this.state.userCountry,
          setUserCountry: this.setUserCountry,

          userImage: this.state.userImage,
          setUserImage: this.setUserImage,

          theme: this.state.theme,
          setTheme: this.setTheme,

          isAuthPage: this.state.isAuthPage,
          setIsAuthPage: this.setIsAuthPage,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
