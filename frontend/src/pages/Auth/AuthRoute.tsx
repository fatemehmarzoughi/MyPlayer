import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useRef} from 'react';
import {
  ChangeProfilePhoto,
  CreateAccount,
  EditProfile,
  ForgetPassword,
  Login,
  Profile,
  ReportABug,
  ResetPassword,
  UpgradeToPremium,
  gray,
  mainColor,
} from 'src';
import {checkLoginStatus} from 'src/utils';
import {styles} from './style';
import {createStackNavigator} from '@react-navigation/stack';

export const LoginCreateAccount: React.FC = React.memo(() => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      style={[styles.topTabBar]}
      screenOptions={{
        tabBarPressColor: gray,
        tabBarInactiveTintColor: gray,
        tabBarActiveTintColor: mainColor,
        tabBarStyle: {padding: 5, shadowColor: mainColor, elevation: 0},
        tabBarIndicatorStyle: {backgroundColor: mainColor, elevation: 0},
      }}>
      <Tab.Screen
        //  screenOptions={{
        //     title : 'Create Account'
        //  }}‍‍
        name="CreateAccount"
        component={props => <CreateAccount {...props} />}
      />
      <Tab.Screen name="Login" component={props => <Login {...props} />} />
    </Tab.Navigator>
  );
});

export const Auth: React.FC<ReturnType<typeof createStackNavigator>> =
  React.memo(Stack => {
    const isLogin = useRef<boolean>();

    useEffect(() => {
      checkLoginStatus().then(accessToken => {
        if (accessToken) isLogin.current = true;
        else isLogin.current = false;
      });
    }, []);

    return (
      <Stack.Navigator>
        <>
          {isLogin ? (
            <>
              <Stack.Screen
                name="Profile"
                component={props => <Profile {...props} />}
                options={{headerShown: false /** tabBarVisible: false, */}}
              />
              <Stack.Screen
                name="ReportABug"
                component={props => <ReportABug {...props} />}
                options={{
                  /** tabBarVisible: false, */
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="UpgradeToPremium"
                component={props => <UpgradeToPremium {...props} />}
                options={{
                  headerShown: false,
                  /** tabBarVisible: false, */
                }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={props => <ResetPassword {...props} />}
                options={{
                  headerShown: false,
                  /** tabBarVisible: false, */
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={props => <EditProfile {...props} />}
                options={{
                  headerShown: false,
                  /** tabBarVisible: false, */
                }}
              />
              <Stack.Screen
                name="ChangeProfilePhoto"
                component={props => <ChangeProfilePhoto {...props} />}
                options={{
                  headerShown: false,
                  /** tabBarVisible: false, */
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login_CreateAccount"
                component={props => <LoginCreateAccount {...props} />}
                options={{
                  /** tabBarVisible: false, */
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ForgetPassword"
                component={props => <ForgetPassword {...props} />}
                options={{
                  /** tabBarVisible: false, */
                  headerShown: false,
                }}
              />
            </>
          )}
        </>
      </Stack.Navigator>
    );
  });
