import {
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {POST} from 'src/API';
import Context from 'src/context/context';
import Toast from 'react-native-toast-message';
import {NavigationProp} from '@react-navigation/native';
import {dark, toastMessageDuration, white} from 'src/assets';
import {Header2, SavingModal, changeBackgroundColor} from 'src/components';

import {styles} from './style';

export interface IResetPasswordProps extends NavigationProp<any, any> {
  navigation: NavigationProp<any, any>;
}
export interface IResetPasswordState {
  oldPass: string;
  newPass: string;
  saving: boolean;
}
export class ResetPassword extends React.Component<
  IResetPasswordProps,
  IResetPasswordState
> {
  constructor(props: IResetPasswordProps) {
    super(props);
    this.state = {
      oldPass: '',
      newPass: '',
      saving: false,
    };
  }

  declare context: React.ContextType<typeof Context>;

  onCancel = () => {
    this.props.navigation.navigate('Profile');
  };

  onSave = async () => {
    this.setState({
      saving: true,
    });

    const reqBody = {
      oldPass: this.state.oldPass,
      newPass: this.state.newPass,
    };

    try {
      const result = await POST('/editProfile/resetPass', reqBody);
      const message = await result.text();
      if (result.status === 200) {
        Toast.show({
          type: 'success',
          position: 'top',
          autoHide: true,
          text1: message,
          text2: 'Your new Password is available for login',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          saving: false,
        });
        this.props.navigation.navigate('Profile');
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          autoHide: true,
          text1: message,
          text2: 'Please try again',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
      this.setState({
        saving: false,
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        autoHide: true,
        text1: 'Something went wrong',
        text2: 'Please try again',
        visibilityTime: toastMessageDuration,
        topOffset: 30,
        bottomOffset: 40,
      });
      this.setState({
        saving: false,
      });
    }
  };

  handleOldPass = (oldPass: string) => {
    this.setState({
      oldPass,
    });
  };

  handleNewPass = (newPass: string) => {
    this.setState({
      newPass,
    });
  };

  override render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header2
            onSave={this.onSave}
            onCancel={this.onCancel}
            title="Reset Password"
          />

          <TextInput
            placeholder="Old Password"
            placeholderTextColor={this.context.theme ? dark : white}
            style={[styles.input, changeBackgroundColor(this.context.theme)]}
            secureTextEntry={true}
            onChangeText={input => this.handleOldPass(input)}
          />
          <TextInput
            placeholder="New Password"
            placeholderTextColor={this.context.theme ? dark : white}
            style={[styles.input, changeBackgroundColor(this.context.theme)]}
            secureTextEntry={true}
            onChangeText={input => this.handleNewPass(input)}
          />
        </View>
        <SavingModal modalVisible={this.state.saving} />
      </ScrollView>
    );
  }
}
