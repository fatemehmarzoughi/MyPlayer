import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  backgroundColor,
  contentColor,
  Header,
  PageWrapper,
} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';
import { gray, lightGray } from 'src/assets/constants';

export interface IForgetPasswordProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<ParamListBase, 'ForgetPassword'>;
}
export interface IForgetPasswordState {
  email: string;
  sending: boolean;
}
export class ForgetPassword2 extends React.PureComponent<
  IForgetPasswordProps,
  IForgetPasswordState
> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

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
            style={[
              styles.input,
              backgroundColor(this.context.theme),
              contentColor(this.context.theme),
            ]}
            placeholderTextColor={this.context.theme === 'light' ? gray: lightGray}
            onChangeText={input => this.handleInput(input)}
          />
          <>
            {this.state.sending ? (
              <TouchableOpacity
                style={[styles.btn]}
                // onPress={() => this.handleSend()}
              >
                <Spinner
                  size={'lg'}
                  accessibilityLabel="Loading posts"
                  color="warning.500"
                  style={{
                    alignSelf: 'center',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                  }}
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
