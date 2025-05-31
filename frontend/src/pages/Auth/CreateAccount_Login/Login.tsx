import {NavigationProp} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React, {useCallback, useContext, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {login} from 'src/API';
import {gray, lightGray, mainColor, toastMessageDuration} from 'src/assets';
import {contentColor} from 'src/components';
import Context from 'src/context/context';
import {storeData} from 'src/LocalStorage';

import {styles} from './style';

export interface ILoginProps {
  navigation: NavigationProp<any, any>;
}

export type ILoginState = {
  passwordIconVisibility: boolean;

  email: string;
  password: string;

  loggingIn: boolean;
};

export const Login = React.memo<ILoginProps>(({navigation}) => {
  const context = useContext(Context);

  const [passwordIconVisibility, setPasswordIconVisibility] =
    useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  const validation = useCallback(() => {
    if (email === '' || password === '') {
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
      setLoggingIn(false);
      return false;
    }
    return true;
  }, [email, password]);

  const handleLogin = useCallback(() => {
    setLoggingIn(true);

    if (!validation()) return;

    login({
      reqBody: {
        identifier: email,
        password: password,
      },
      onSuccess: async data => {
        context.setIsLogin(true);
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
        navigation.navigate('Profile');
      },

      onError: err => {
        setLoggingIn(false);
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
  }, [context, email, navigation, password, validation]);

  const passwordVisibility = useCallback(() => {
    setPasswordIconVisibility(!passwordIconVisibility);
  }, [passwordIconVisibility]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.mainTitle, contentColor(context.theme)]}>
          Login
        </Text>
        <View style={styles.input}>
          <TextInput
            style={[styles.textInput, contentColor(context.theme)]}
            placeholderTextColor={context.theme === 'light' ? gray : lightGray}
            placeholder="Email"
            onChangeText={input => setEmail(input)}
            autoCapitalize="none"></TextInput>
        </View>
        <View style={styles.input}>
          <TextInput
            style={[styles.textInput, contentColor(context.theme)]}
            placeholderTextColor={context.theme === 'light' ? gray : lightGray}
            placeholder="Password"
            secureTextEntry={passwordIconVisibility}
            onChangeText={input => {
              setPassword(input);
            }}
            autoCapitalize="none"></TextInput>
          <View style={styles.eyeIconsStyle}>
            <Icon
              onPress={() => passwordVisibility()}
              style={[
                styles.eyeIconStyle,
                {opacity: passwordIconVisibility ? 0 : 1},
              ]}
              name="eye-outline"
              size={20}
              color={mainColor}
            />
            <Icon
              onPress={() => passwordVisibility()}
              style={[
                styles.eyeIconStyle,
                {opacity: passwordIconVisibility ? 1 : 0},
              ]}
              name="eye-off-outline"
              size={20}
              color={mainColor}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassword')}
          style={styles.resetPassword}>
          <Text style={[styles.forgetPassText, contentColor(context.theme)]}>
            Forgot Your Password?
          </Text>
          <Text style={[styles.resetText, contentColor(context.theme)]}>
            {' '}
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.btn}>
          {loggingIn ? (
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
          // onPress={() => handleLoginWithGoogle()}
        >
          <Icon
            name="logo-google"
            size={30}
            color={mainColor}
            style={styles.googleLogo}
          />
          <Text style={contentColor(context.theme)}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});
