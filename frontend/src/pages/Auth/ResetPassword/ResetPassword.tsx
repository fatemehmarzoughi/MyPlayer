import {View, TextInput, ScrollView} from 'react-native';
import React from 'react';
import {POST, updateUser} from 'src/API';
import Context from 'src/context/context';
import Toast from 'react-native-toast-message';
import {NavigationProp} from '@react-navigation/native';
import {dark, gray, toastMessageDuration, white} from 'src/assets';
import {Header2, PageWrapper, SavingModal, backgroundColor, contentColor} from 'src/components';

import {styles} from './style';

export interface IResetPasswordProps {
  navigation: NavigationProp<any, any>;
}
export interface IResetPasswordState {
  newPass: string;
  saving: boolean;
}
export class ResetPassword extends React.PureComponent<
  IResetPasswordProps,
  IResetPasswordState
> {
  constructor(props: IResetPasswordProps) {
    super(props);
    this.state = {
      newPass: '',
      saving: false,
    };
  }

  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  onSave = async () => {
    this.setState({
      saving: true,
    });

    updateUser({
      reqBody: {
        password: this.state.newPass,
      },
      onSuccess: data => {
        this.setState({
          saving: false,
        });
        Toast.show({
          type: 'success',
          position: 'top',
          autoHide: true,
          text1: 'Password changed successfully',
          text2: 'Your new Password is available for login',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.navigation.navigate('Profile');
      },
      onError: err => {
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
      },
    });
  };

  override render() {
    return (
      <ScrollView>
        <PageWrapper>
          <Header2
            onSave={this.onSave}
            onCancel={() => this.props.navigation.goBack()}
            title="Reset Password"
          />
          <TextInput
            placeholder="New Password"
            placeholderTextColor={this.context.theme === 'light' ? dark : gray}
            style={[styles.input, backgroundColor(this.context.theme), contentColor(this.context.theme)]}
            secureTextEntry={true}
            onChangeText={newPass =>
              this.setState({
                newPass,
              })
            }
          />
        </PageWrapper>
        <SavingModal modalVisible={this.state.saving} />
      </ScrollView>
    );
  }
}
