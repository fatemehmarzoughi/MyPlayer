import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {gray, lightGray, mainColor, toastMessageDuration} from 'src/assets';
import React from 'react';
import {login} from 'src/API';
import Context from 'src/context/context';
import {storeData} from 'src/LocalStorage';
import {contentColor} from 'src/components';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';

import {styles} from './style';
import {Spinner} from 'native-base';

export interface ILoginProps {
  navigation: NavigationProp<any, any>;
}

export type ILoginState = {
  passwordIconVisibility: boolean;

  email: string;
  password: string;

  loggingIn: boolean;
};

export class Login extends React.PureComponent<ILoginProps, ILoginState> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      passwordIconVisibility: true,

      email: '',
      password: '',

      loggingIn: false,
    };
  }

  validation = () => {
    if (this.state.email === '' || this.state.password === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Failed logging in',
        text2: 'Email and Password are required.',
        visibilityTime: toastMessageDuration,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      this.setState({
        loggingIn: false,
      });
      return false;
    }
    return true;
  };

  handleLogin = () => {
    this.setState({
      loggingIn: true,
    });

    if (!this.validation()) return;

    login({
      reqBody: {
        identifier: this.state.email,
        password: this.state.password,
      },
      onSuccess: async data => {
        this.context.setIsLogin(true);
        await storeData('userId', data.user.id);
        await storeData('accessToken', data.jwt);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Logged in Successfully',
          text2: 'Welcome to MyPlayer',
          visibilityTime: toastMessageDuration,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.navigation.navigate('Profile');
      },

      onError: err => {
        this.setState({
          loggingIn: false,
        });
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: String(err),
          text2: 'Please try again',
          visibilityTime: toastMessageDuration,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      },
    });
  };

  // handleLoginWithGoogle = async () => {
  //   console.log('login with google');

  //   const iosClientId = REACT_APP_IOS_CLIENT_ID;
  //   const webClientId = REACT_APP_ANDROID_CLIENT_ID;

  //   GoogleSignin.configure({
  //     webClientId,
  //     iosClientId,
  //   });

  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     this.context.setUserName(userInfo.user.givenName!);
  //     this.context.setUserEmail(userInfo.user.email);
  //     await storeData('accessToken', 'GoogleToken');
  //     Toast.show({
  //       type: 'success',
  //       position: 'top',
  //       text1: 'Logged in Successfully',
  //       text2: 'Welcome to MyPlayer',
  //       visibilityTime: toastMessageDuration,
  //       autoHide: true,
  //       topOffset: 30,
  //       bottomOffset: 40,
  //     });
  //     this.context.setIsLogin(true);
  //     this.props.navigation.navigate('Home');
  //   } catch (err: any) {
  //     switch (err.code) {
  //       case statusCodes.SIGN_IN_CANCELLED:
  //         Toast.show({
  //           type: 'error',
  //           position: 'bottom',
  //           text1: 'Create Account canceled',
  //           text2: 'Please try again',
  //           autoHide: true,
  //           visibilityTime: toastMessageDuration,
  //           topOffset: 30,
  //           bottomOffset: 40,
  //         });
  //         break;
  //       case statusCodes.IN_PROGRESS:
  //         Toast.show({
  //           type: 'error',
  //           position: 'bottom',
  //           text1: 'Create Account is in Progress',
  //           text2: 'Please wait',
  //           autoHide: true,
  //           topOffset: 30,
  //           bottomOffset: 40,
  //           visibilityTime: toastMessageDuration,
  //         });
  //         break;
  //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //         Toast.show({
  //           type: 'error',
  //           position: 'bottom',
  //           text1: 'Play services not available',
  //           text2: 'Please try again.',
  //           autoHide: true,
  //           topOffset: 30,
  //           bottomOffset: 40,
  //           visibilityTime: toastMessageDuration,
  //         });
  //         break;
  //     }
  //   }
  // };

  passwordVisibility = () => {
    console.log('tufjhbk');
    this.setState({
      passwordIconVisibility: !this.state.passwordIconVisibility,
    });
  };

  handleResetPass = () => {
    this.props.navigation.navigate('ForgetPassword');
  };

  override render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.mainTitle, contentColor(this.context.theme)]}>
            Login
          </Text>
          <View style={styles.input}>
            <TextInput
              style={[styles.textInput, contentColor(this.context.theme)]}
              placeholderTextColor={
                this.context.theme === 'light' ? gray : lightGray
              }
              placeholder="Email"
              onChangeText={input => {
                this.setState({email: input});
              }}
              autoCapitalize="none"></TextInput>
          </View>
          <View style={styles.input}>
            <TextInput
              style={[styles.textInput, contentColor(this.context.theme)]}
              placeholderTextColor={
                this.context.theme === 'light' ? gray : lightGray
              }
              placeholder="Password"
              secureTextEntry={this.state.passwordIconVisibility}
              onChangeText={input => {
                this.setState({password: input});
              }}
              autoCapitalize="none"></TextInput>
            <View style={styles.eyeIconsStyle}>
              <Icon
                onPress={() => this.passwordVisibility()}
                style={[
                  styles.eyeIconStyle,
                  {opacity: this.state.passwordIconVisibility ? 0 : 1},
                ]}
                name="eye-outline"
                size={20}
                color={mainColor}
              />
              <Icon
                onPress={() => this.passwordVisibility()}
                style={[
                  styles.eyeIconStyle,
                  {opacity: this.state.passwordIconVisibility ? 1 : 0},
                ]}
                name="eye-off-outline"
                size={20}
                color={mainColor}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.handleResetPass()}
            style={styles.resetPassword}>
            <Text style={[styles.forgetPassText]}>Forgot Your Password?</Text>
            <Text style={[styles.resetText]}> Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleLogin()}
            style={styles.btn}>
            {this.state.loggingIn ? (
              <Spinner
                size="sm"
                accessibilityLabel="Loading posts"
                color="warning.100"
                style={{
                  alignSelf: 'center',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            ) : (
              <Text style={styles.btnText}>Login</Text>
            )}
          </TouchableOpacity>
          <View style={styles.seperator}>
            <View style={styles.line}></View>
            <Text>OR</Text>
            <View style={styles.line}></View>
          </View>

          <TouchableOpacity
            style={styles.googleBtn}
            // onPress={() => this.handleLoginWithGoogle()}
          >
            <Icon
              name="logo-google"
              size={30}
              color={mainColor}
              style={styles.googleLogo}
            />
            <Text style={contentColor(this.context.theme)}>
              Login with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
