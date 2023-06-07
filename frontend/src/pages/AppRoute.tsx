import {
  Login,
  Search,
  Profile,
  OnBoarding,
  CreateAccount,
  EntriesOptions,
  ForgetPassword,
  Live,
  ReportABug,
  UpgradeToPremium,
  ResetPassword,
  EditProfile,
  ChangeProfilePhoto,
} from 'src/pages';
import React, {useContext} from 'react';
import Home from './Home/Home';
import Context from 'src/context/context';
import {gray, mainColor} from 'src/assets';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MD3DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './style';
import {backgroundColor} from 'src/components';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const LoginCreateAccount = React.memo(() => (
  <Tab.Navigator
    style={[styles.topTabBar]}
    screenOptions={{
      tabBarPressColor: gray,
      tabBarInactiveTintColor: gray,
      tabBarActiveTintColor: mainColor,
      tabBarStyle: {padding: 5, shadowColor: mainColor, elevation: 0},
      tabBarIndicatorStyle: {backgroundColor: mainColor, elevation: 0},
    }}>
    <Tab.Screen name="Login">{props => <Login {...props} />}</Tab.Screen>
    <Tab.Screen name="CreateAccount">
      {props => <CreateAccount {...props} />}
    </Tab.Screen>
  </Tab.Navigator>
));

const Auth = React.memo(() => {
  const {isLogin} = useContext(Context);

  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'Login_CreateAccount' : 'Profile'}>
      {isLogin ? (
        <>
          <Stack.Screen
            name="Profile"
            options={{
              headerShown: false,
            }}>
            {props => <Profile {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="ReportABug"
            options={{
              headerShown: false,
            }}>
            {props => <ReportABug {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="UpgradeToPremium"
            options={{
              headerShown: false,
            }}>
            {props => <UpgradeToPremium {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="ResetPassword"
            options={{
              headerShown: false,
            }}>
            {props => <ResetPassword {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="EditProfile"
            options={{
              headerShown: false,
            }}>
            {props => <EditProfile {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="ChangeProfilePhoto"
            options={{
              headerShown: false,
            }}>
            {props => <ChangeProfilePhoto {...props} />}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login_CreateAccount"
            component={LoginCreateAccount}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ForgetPassword"
            options={{
              headerShown: false,
            }}>
            {props => <ForgetPassword {...props} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
});

const BottomTabs = React.memo(function BottomTabs() {
  const contexts = useContext(Context);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={mainColor}
      inactiveColor={contexts.theme === 'light' ? 'black' : 'white'}
      barStyle={backgroundColor(contexts.theme)}>
      <BottomTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-sharp" size={22} color={color} />
          ),
          tabBarLabel: 'Home',
        }}>
        {props => <Home {...props} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Live"
        options={{
          tabBarIcon: ({color}) => <Icon name="wifi" size={22} color={color} />,
        }}>
        {props => <Live {...props} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Auth"
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

export const AppRoute: React.FC = React.memo(() => {
  const {isFirstInstallation} = useContext(Context);
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          initialRouteName={
            isFirstInstallation === null ? 'onBoarding' : 'Home'
          }>
          <Stack.Screen
            name="appRoute"
            component={BottomTabs}
            options={{
              title: 'Home',
              headerShown: false,
            }}
          />
          <Stack.Screen name="Search">
            {props => <Search {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="onBoarding"
            options={{
              headerShown: false,
            }}>
            {props => <OnBoarding {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="EntriesOptions"
            options={{
              headerShown: false,
            }}>
            {props => <EntriesOptions {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
});
