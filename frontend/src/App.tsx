import React from 'react';
import {AppRoute} from 'src/pages';
import {checkLoginStatus} from 'src';
import Context from 'src/context/context';
import {StatusBar} from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import {getData, storeData} from 'src/LocalStorage';
import SplashScreen from 'react-native-splash-screen';

export interface IAppProps {}
export interface IAppStates {
  checkingFirstTimeUsers: boolean;
  isFirstInstallation: false | null;
}

export class App extends React.PureComponent<IAppProps, IAppStates> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  private _isMount: boolean;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      checkingFirstTimeUsers: true,
      isFirstInstallation: null,
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

      const isFirstInstallation = await getData('isFirstInstallation');
      console.log(`isFirstInstallation = ${isFirstInstallation}`);
      console.log(`isFirstInstallation === null = ${isFirstInstallation === null}`);
      
      if (isFirstInstallation === null) {
        await storeData('isFirstInstallation', false);
        this.setState({
          isFirstInstallation: false,
        })
        console.log(`isFirstInstallation = ${isFirstInstallation}`);
      }
      this.setState({checkingFirstTimeUsers: false});
    } catch {
      (err: any) => console.log(err);
    }
  }

  override componentWillUnmount() {
    this._isMount = false;
  }

  override render(){
    const { checkingFirstTimeUsers, isFirstInstallation } = this.state;
    if (!checkingFirstTimeUsers) SplashScreen.hide();
    
    return (
      <>
        <StatusBar style="auto" hidden />
        <>
          {checkingFirstTimeUsers ? (
            <LottieView
              loop={true}
              autoPlay={true}
              source={require('./assets/Images/loading2.json')}
            />
          ) : (
            <AppRoute isFirstInstallation={isFirstInstallation} />
          )}
        </>
        <Toast />
      </>
    );
  }
}
