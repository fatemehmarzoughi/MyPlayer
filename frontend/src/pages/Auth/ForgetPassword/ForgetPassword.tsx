import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {POST} from 'src/API';
import {Header, PageWrapper} from 'src/components';
import {toastMessageDuration} from 'src/assets';

import {styles} from './style';

export interface IForgetPasswordProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<ParamListBase, 'ForgetPassword'>;
}
export interface IForgetPasswordState {
  email: string;
  sending: boolean;
}
export class ForgetPassword extends React.PureComponent<
  IForgetPasswordProps,
  IForgetPasswordState
> {
  constructor(props: IForgetPasswordProps) {
    super(props);
    this.state = {
      email: '',
      sending: false,
    };
  }

  // handleSend = async () => {
  //   this.setState({
  //     sending: true,
  //   });
  //   if (this.state.email === '') {
  //     Toast.show({
  //       type: 'error',
  //       position: 'bottom',
  //       text1: 'Please enter your email',
  //       topOffset: 30,
  //       bottomOffset: 40,
  //       autoHide: true,
  //       visibilityTime: toastMessageDuration,
  //     });
  //     this.setState({
  //       sending: false,
  //     });
  //     return;
  //   }

  //   const reqBody = {
  //     email: this.state.email,
  //   };
  //   try {
  //     const res = await POST('/forgotPassword', reqBody);
  //     const message = await res.text();
  //     if (res.status === 200) {
  //       Toast.show({
  //         type: 'success',
  //         position: 'top',
  //         text1: 'Email sent',
  //         text2: 'Please check your inbox',
  //         topOffset: 30,
  //         bottomOffset: 40,
  //         autoHide: true,
  //         visibilityTime: toastMessageDuration,
  //       });
  //       this.setState({
  //         sending: false,
  //       });
  //       this.props.navigation.navigate('Login_CreateAccount');
  //       return;
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         position: 'bottom',
  //         text1: message,
  //         text2: 'Please try again',
  //         topOffset: 30,
  //         bottomOffset: 40,
  //         autoHide: true,
  //         visibilityTime: toastMessageDuration,
  //       });
  //       this.setState({
  //         sending: false,
  //       });
  //       return;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     Toast.show({
  //       type: 'error',
  //       position: 'bottom',
  //       text1: 'Something went wrong',
  //       text2: 'Please try again',
  //       topOffset: 30,
  //       bottomOffset: 40,
  //       autoHide: true,
  //       visibilityTime: toastMessageDuration,
  //     });
  //     this.setState({
  //       sending: false,
  //     });
  //   }
  // };

  handleInput = (email: string) => {
    this.setState({
      email,
    });
  };

  override render() {
    return (
      <ScrollView>
        <PageWrapper>
          <Header
            title="Forgot Password"
            customClick={() => this.props.navigation.goBack()}
          />
          <Text style={{textAlign: 'center'}}>
            You will receive an email for reseting the password
          </Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={input => this.handleInput(input)}
          />
          <>
            {this.state.sending ? (
              <TouchableOpacity
                style={styles.btn}
                // onPress={() => this.handleSend()}
              >
                <LottieView
                  loop={true}
                  autoPlay={true}
                  source={require('../../../assets/Images/loading.json')}
                />
                <Text style={styles.btnText}>Sending</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn}
                // onPress={() => this.handleSend()}
              >
                <Text style={styles.btnText}>Send</Text>
              </TouchableOpacity>
            )}
          </>
        </PageWrapper>
      </ScrollView>
    );
  }
}
