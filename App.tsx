import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import { NativeBaseProvider } from "native-base";
import { createStore, applyMiddleware } from "redux";
import SplashScreen from "react-native-splash-screen";
import { composeWithDevTools } from "redux-devtools-extension";

import { mainReducer } from "src/Redux";
import { AppRoute } from "src/pages";
import ContextProvider from "src/context/contextProvider";
import { getData, storeData } from "src/LocalStorage";

export interface IAppProps {}
export interface IAppStates {
  checkingFirstTimeUsers: boolean;
  isFirstInstallation: boolean;
}

export const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default class App extends React.Component<IAppProps, IAppStates> {
  private _isMount: boolean;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      checkingFirstTimeUsers: true,
      isFirstInstallation: false,
    };

    this._isMount = false;
  }

  override async componentDidMount() {
    // routingInstrumentation.registerAppContainer(this.appContainer);
    this._isMount = true;
    try {
      const isFirstInstallation = await getData("isFirstInstallation");
      if (isFirstInstallation === null) {
        // if(isFirstInstallation !== null)
        await storeData("isFirstInstallation", "false");
        this._isMount &&
          this.setState({
            isFirstInstallation: true,
            checkingFirstTimeUsers: false,
          });
        console.log(
          `isFirstInstallation in App.js = ${this.state.isFirstInstallation}`
        );
      } else {
        this._isMount &&
          this.setState({
            isFirstInstallation: false,
            checkingFirstTimeUsers: false,
          });
      }
    } catch {
      (err: any) => console.log(err);
    }
  }

  override componentWillUnmount() {
    this._isMount = false;
  }

  override render() {
    if (!this.state.checkingFirstTimeUsers) SplashScreen.hide();

    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <ContextProvider>
            <StatusBar style="auto" hidden />
            <>
              {this.state.checkingFirstTimeUsers ? (
                <LottieView
                  loop={true}
                  autoPlay={true}
                  source={require("./src/assets/Images/loading2.json")}
                />
              ) : (
                <AppRoute
                  isFirstInstallation={this.state.isFirstInstallation}
                />
              )}
            </>
            <Toast />
          </ContextProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
});
