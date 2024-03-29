import {StatusBar} from "expo-status-bar";
import {Spinner} from "native-base";
import React from "react";
import SplashScreen from "react-native-splash-screen";
import Toast from "react-native-toast-message";
import {checkLoginStatus} from "src";
import Context from "src/context/context";
import {getData, storeData} from "src/LocalStorage";
import {AppRoute} from "src/pages";

export interface IAppProps {}
export interface IAppStates {
  checkingFirstTimeUsers: boolean;
}

export class App extends React.PureComponent<IAppProps, IAppStates> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  private _isMount: boolean;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      checkingFirstTimeUsers: true,
    };

    this._isMount = false;
  }

  override async componentDidMount() {
    // routingInstrumentation.registerAppContainer(this.appContainer);
    this._isMount = true;
    try {
      checkLoginStatus().then(isLogin => {
        this.context.setIsLogin(isLogin);
      });

      const isFirstInstallation = await getData("isFirstInstallation");
      if (isFirstInstallation === null) {
        await storeData("accessToken", null);
        // if (isFirstInstallation !== null) {
        // for test
        await storeData("isFirstInstallation", "false");
        this._isMount && this.context.setIsFirstInstallation(null);
        this._isMount &&
          this.setState({
            checkingFirstTimeUsers: false,
          });
        console.log(
          `isFirstInstallation in App.js = ${this.context.isFirstInstallation}`,
        );
      } else {
        this._isMount && this.context.setIsFirstInstallation(false);

        this._isMount &&
          this.setState({
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
    const {checkingFirstTimeUsers} = this.state;
    if (!checkingFirstTimeUsers) SplashScreen.hide();

    return (
      <>
        <StatusBar style="auto" hidden />
        <>
          {checkingFirstTimeUsers ? (
            <Spinner
              size="lg"
              accessibilityLabel="Loading posts"
              color="warning.500"
              style={{
                alignSelf: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            />
          ) : (
            <AppRoute />
          )}
        </>
        <Toast />
      </>
    );
  }
}
