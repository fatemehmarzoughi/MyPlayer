import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React, {useCallback, useContext,useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import {gray, lightGray} from 'src/assets/constants';
import {
  backgroundColor,
  contentColor,
  Header,
  PageWrapper,
} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';

interface IForgetPasswordProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<ParamListBase, 'ForgetPassword'>;
}

export const ForgetPassword = React.memo<IForgetPasswordProps>(
  ({navigation}) => {
    const context = useContext(Context);

    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);

    // const handleSend = useCallback(async () => {
    //   setSending(true);
    //   if (email === '') {
    //     Toast.show({
    //       type: 'error',
    //       position: 'bottom',
    //       text1: 'Please enter your email',
    //       topOffset: 30,
    //       bottomOffset: 40,
    //       autoHide: true,
    //       visibilityTime: toastMessageDuration,
    //     });
    //     setSending(false);
    //     return;
    //   }

    //   const reqBody = { email };
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
    //       setSending(false);
    //       navigation.navigate('Login_CreateAccount');
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
    //       setSending(false);
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
    //     setSending(false);
    //   }
    // }, [email, navigation]);

    const handleInput = useCallback((input: string) => {
      setEmail(input);
    }, []);

    return (
      <ScrollView>
        <PageWrapper>
          <Header
            title="Forgot Password"
            customClick={() => navigation.goBack()}
          />
          <Text style={{textAlign: 'center'}}>
            You will receive an email for reseting the password
          </Text>
          <TextInput
            placeholder="Email"
            style={[
              styles.input,
              backgroundColor(context.theme),
              contentColor(context.theme),
            ]}
            placeholderTextColor={context.theme === 'light' ? gray : lightGray}
            onChangeText={handleInput}
          />
          {sending ? (
            <TouchableOpacity style={styles.btn}>
              {/* onPress={handleSend} */}
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
            <TouchableOpacity style={styles.btn}>
              {/* onPress={handleSend} */}
              <Text style={styles.btnText}>Send</Text>
            </TouchableOpacity>
          )}
        </PageWrapper>
      </ScrollView>
    );
  },
);
