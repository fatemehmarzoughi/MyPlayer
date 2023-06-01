import {
  Live,
  Login,
  About,
  Search,
  Profile,
  ReportABug,
  OnBoarding,
  EditProfile,
  CreateAccount,
  ResetPassword,
  ForgetPassword,
  TermsAndPolicy,
  EnteriesOptions,
  UpgradeToPremium,
  checkLoginStatus,
  ChangeProfilePhoto,
} from 'src/pages';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Home from './Home/Home';
import React, { useContext } from 'react';
import Context from 'src/context/context';
import {gray, mainColor} from 'src/assets';
import {changeBackgroundColor} from 'src/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {styles} from './style';

export type IAppRouteProps = {
  isFirstInstallation: boolean;
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const LoginCreateAccount: React.FC = React.memo(() => {
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
        component={(props) => <CreateAccount {...props} /> }
      />
      <Tab.Screen name="Login" component={(props) => <Login {...props} /> } />
    </Tab.Navigator>
  );
});

const Auth: React.FC = React.memo(() => {
  const contextVars = useContext(Context);
  checkLoginStatus(contextVars.setIsLogin);
  return (
    <Stack.Navigator>
      <>
        {contextVars.isLogin ? (
          <>
            <Stack.Screen
              name="Profile"
              component={(props) => <Profile {...props} /> }
              options={{headerShown: false /** tabBarVisible: false, */}}
            />
            <Stack.Screen
              name="ReportABug"
              component={(props) => <ReportABug {...props} /> }
              options={{
                /** tabBarVisible: false, */
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UpgradeToPremium"
              component={(props) => <UpgradeToPremium {...props} /> }
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={(props) => <ResetPassword {...props} /> }
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={(props) => <EditProfile {...props} /> }
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="ChangeProfilePhoto"
              component={(props) => <ChangeProfilePhoto {...props} /> }
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
              component={(props) => <LoginCreateAccount {...props} />}
              options={{
                /** tabBarVisible: false, */
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ForgetPassword"
              component={(props) => <ForgetPassword {...props} /> }
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

const BottomTabs: React.FC = React.memo(() => {
  const contexts = useContext(Context);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={mainColor}
      // inactiveColor={(contexts.theme) ? dark : white}
      // barStyle={changeBackgroundColor(contexts.theme)}
      inactiveColor={contexts.theme ? 'black' : 'white'}
      barStyle={changeBackgroundColor(contexts.theme)}>
      <BottomTab.Screen
        name="Home"
        component={(props) => <Home {...props} /> }
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-sharp" size={22} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={(props) => <Live {...props} /> }
        options={{
          tabBarIcon: ({color}) => <Icon name="wifi" size={22} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Auth}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={22} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
});

const DrawerPages: React.FC = React.memo(() => {
  return (
    <Drawer.Navigator
      initialRouteName="MyPlayer"
      screenOptions={{
        headerShown: false,
      }}
      // drawerContent={(props) => <MenuContent {...props} />}
    >
      <Drawer.Screen name="MyPlayer" component={(props) => <BottomTabs {...props} />} />

      <Drawer.Screen
        name="About"
        component={(props) => <About {...props} /> }
      />

      <Drawer.Screen
        name="TermsAndPolicy"
        component={(props) => <TermsAndPolicy {...props} /> }
      />

      {/* <Drawer.Screen name="Search" component={Search} /> */}
    </Drawer.Navigator>
  );
});

export const AppRoute: React.FC<IAppRouteProps> = React.memo(
  ({isFirstInstallation}) => {
    const contexts = useContext(Context);

    return (
      <NavigationContainer >
        <Stack.Navigator
          initialRouteName={isFirstInstallation ? 'OnBoarding' : 'Home'}>
          <Stack.Screen
            name="OnBoarding"
            component={(props) => <OnBoarding {...props} /> }
            options={{
              /** tabBarVisible: false, */
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EnteriesOptions"
            component={(props) => <EnteriesOptions {...props} /> }
            options={{
              /** tabBarVisible: false, */
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Search"
            component={(props) => <Search {...props} />}
            options={{
              /** tabBarVisible: true, */
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Home"
            component={(props) => <DrawerPages {...props} />}
            //    component={Home}
            options={{
              /** tabBarVisible: false, */
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Auth"
            component={(props) => <LoginCreateAccount {...props} />}
            options={{
              // tabBarVisible: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);
