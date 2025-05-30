import {StatusBar} from 'expo-status-bar';
import {Spinner} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {checkLoginStatus} from 'src';
import Context from 'src/context/context';
import {getData, storeData} from 'src/LocalStorage';
import {AppRoute} from 'src/pages';

export const App = React.memo(() => {
  const [checkingFirstTimeUsers, setCheckingFirstTimeUsers] = useState(true);
  const context = useContext(Context);

  useEffect(() => {
    let isMounted = true;
    console.log('checkingFirstTimeUsers = ', checkingFirstTimeUsers);
    console.log('isMounted', isMounted);

    const init = async () => {
      try {
        checkLoginStatus().then(isLogin => {
          if (isMounted) context.setIsLogin(isLogin);
        });

        const isFirstInstallation = await getData('isFirstInstallation');
        console.log('isFirstInstallation', isFirstInstallation);

        if (isFirstInstallation === null) {
          await storeData('accessToken', null);
          await storeData('isFirstInstallation', 'false');

          if (isMounted) {
            context.setIsFirstInstallation(null);
            setCheckingFirstTimeUsers(false);
          }

          console.log(
            `isFirstInstallation in App.js = ${context.isFirstInstallation}`,
          );
        } else {
          if (isMounted) {
            context.setIsFirstInstallation(false);
            setCheckingFirstTimeUsers(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []); // don't change these dependencies

  if (!checkingFirstTimeUsers) {
    SplashScreen.hide();
  }

  return (
    <>
      <StatusBar style="auto" hidden />
      {checkingFirstTimeUsers ? (
        <Spinner
          size="lg"
          accessibilityLabel="Loading posts"
          color="warning.500"
          style={{
            alignSelf: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        />
      ) : (
        <AppRoute />
      )}
      <Toast />
    </>
  );
});
