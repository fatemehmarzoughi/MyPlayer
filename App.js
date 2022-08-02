import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import ContextProvider from "context/contextProvider";
import AppRoute from "pages/AppRoute";
import Toast from "react-native-toast-message";
import { getData, storeData } from "LocalStorage/AsyncStorageData";
import SplashScreen from "react-native-splash-screen";
import LottieView from "lottie-react-native";
import { NativeBaseProvider } from "native-base";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { mainReducer } from "./src/Redux/reducers/index.js";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      checkingFirstTimeUsers: true,
      isFirstInstallation: false
    };

    this._isMount = false;
  }

  async componentDidMount () {
    // routingInstrumentation.registerAppContainer(this.appContainer);
    this._isMount = true;
    try {
      const isFirstInstallation = await getData("isFirstInstallation");
      // if(isFirstInstallation !== null)
      if (isFirstInstallation === null) {
        await storeData("isFirstInstallation", "false");
        this._isMount && this.setState({
          isFirstInstallation: true,
          checkingFirstTimeUsers: false
        });
        console.log(`isFirstInstallation in App.js = ${this.state.isFirstInstallation}`);
      } else {
        this._isMount && this.setState({
          isFirstInstallation: false,
          checkingFirstTimeUsers: false
        });
      }
    } catch (err) { console.log(err); };
  }

  componentWillUnmount () {
    this._isMount = false;
  }

  render () {
    if (!this.state.checkingFirstTimeUsers) SplashScreen.hide();

    return (
      <Provider store={store}>
      <NativeBaseProvider>
        <ContextProvider>
            <StatusBar style="auto" hidden />
            <>
            {this.state.checkingFirstTimeUsers
              ? (
              <LottieView loop={true} autoPlay={true} source={require("./src/assets/Images/loading2.json")} />
                )
              : (
              <AppRoute isFirstInstallation = {this.state.isFirstInstallation} />
                )}
            </>
            <Toast ref={(ref) => Toast.setRef(ref)} />
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
    justifyContent: "center"
  }
});
