import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useContext,useState} from 'react';
import {ScrollView,TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {updateUser} from 'src/API';
import {
  dark,
  gray,
  toastMessageDuration,
} from 'src/assets';
import {
  backgroundColor,
  contentColor,
  Header2,
  PageWrapper,
  SavingModal,
} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';

interface IResetPasswordProps {
  navigation: NavigationProp<any, any>;
}

export const ResetPassword = React.memo(({navigation}: IResetPasswordProps) => {
  const context = useContext(Context);

  const [newPass, setNewPass] = useState('');
  const [saving, setSaving] = useState(false);

  const onSave = useCallback(() => {
    setSaving(true);

    updateUser({
      reqBody: {password: newPass},
      onSuccess: () => {
        setSaving(false);
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
        navigation.navigate('Profile');
      },
      onError: () => {
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
        setSaving(false);
      },
    });
  }, [newPass, navigation]);

  return (
    <ScrollView>
      <PageWrapper>
        <Header2
          onSave={onSave}
          onCancel={() => navigation.goBack()}
          title="Reset Password"
        />
        <TextInput
          placeholder="New Password"
          placeholderTextColor={context.theme === 'light' ? dark : gray}
          style={[
            styles.input,
            backgroundColor(context.theme),
            contentColor(context.theme),
          ]}
          secureTextEntry
          onChangeText={setNewPass}
        />
      </PageWrapper>
      <SavingModal modalVisible={saving} />
    </ScrollView>
  );
});
