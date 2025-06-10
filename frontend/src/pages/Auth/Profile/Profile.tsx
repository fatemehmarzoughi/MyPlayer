import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {getUserInfo, PlanType} from 'src/API';
import {dark, gray, mainColor, toastMessageDuration, white} from 'src/assets';
import {
  contentColor,
  ModalClass,
  PageWrapper,
  ProfileOption,
} from 'src/components';
import Context from 'src/context/context';
import {getData, storeData} from 'src/LocalStorage';
import Notification from 'src/Notification/NotificationSetup';

import {styles} from './style';

interface ProfileProps {
  navigation: NavigationProp<any, any>;
}

export const Profile = React.memo(({navigation}: ProfileProps) => {
  const context = useContext(Context);

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);
  const [appNotification, setAppNotification] = useState(true);

  const mountedRef = useRef(false);

  const handleLogOut = useCallback(async () => {
    try {
      const accessToken = await getData('accessToken');
      if (accessToken === 'GoogleToken') {
        await GoogleSignin.signOut();
      }
      await storeData('accessToken', null);
      await storeData('userId', null);
      setModalVisible(false);
      context.setIsLogin(false);
      navigation.navigate('Login_CreateAccount');
    } catch (err) {
      console.log(err);
    }
  }, [context, navigation]);

  const handleAppNotification = useCallback(async () => {
    // const newState = '' + !appNotification + '';
    // await storeData('appNotification', newState);
    setAppNotification(prev => !prev);
    // if (!appNotification) {
    //   Notification.notifyOnMessage(new Date(Date.now() + 2000));
    // }
  }, []);

  const getUser = useCallback(async () => {
    await getUserInfo({
      onSuccess: data => {
        context.setUserInfo(data);
        setRefreshing(false);
      },
      onError: () => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: "Couldn't refresh!",
          text2: 'Please Check your Network',
          visibilityTime: toastMessageDuration,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setRefreshing(false);
      },
    });
  }, [context]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getUser();
  }, [getUser]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setTimeout(() => {
        getUser();
      }, 1000);
    }

    const loadAppNotification = async () => {
      const value = await getData('appNotification');
      setAppNotification(value !== 'false');
    };
    loadAppNotification();

    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });

    return () => {
      unsubscribe?.();
    };
  }, [navigation, getUser, context.userInfo?.avatar]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <PageWrapper>
        <View style={styles.header}>
          <Text style={[styles.title, contentColor(context.theme)]}>
            Profile
          </Text>
          <View style={styles.row1}>
            <Image
              style={styles.profileImg}
              source={{uri: context.userInfo?.avatar}}
            />

            <View style={styles.nameEmail}>
              {!context.userInfo?.email && !context.userInfo?.username ? (
                <Spinner
                  size={'lg'}
                  accessibilityLabel="Loading posts"
                  color="warning.500"
                  style={styles.loadingIcon}
                />
              ) : (
                <>
                  <View style={styles.name}>
                    <Icon2
                      name="person"
                      size={25}
                      color={context.theme === 'light' ? dark : white}
                    />
                    <Text
                      style={[styles.nameText, contentColor(context.theme)]}>
                      {context.userInfo?.username}
                    </Text>
                  </View>
                  <Text style={[styles.email, contentColor(context.theme)]}>
                    {context.userInfo?.email}
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.row2}>
            <View style={styles.My}>
              <Text style={[styles.MyText, contentColor(context.theme)]}>
                12
              </Text>
              <Text style={[styles.MyText, contentColor(context.theme)]}>
                My Saved
              </Text>
            </View>
            <View style={styles.My}>
              <Text style={[styles.MyText, contentColor(context.theme)]}>
                2
              </Text>
              <Text style={[styles.MyText, contentColor(context.theme)]}>
                My playlist
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.editProfile}>
              <Icon name="pencil" size={20} color={white} />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.seperators}>
          <Text style={styles.seperator}></Text>
          <Text style={styles.seperator}></Text>
        </View>

        <View style={styles.part}>
          <Text style={[styles.subTitle, contentColor(context.theme)]}>
            Account Settings
          </Text>

          <ProfileOption
            title={
              context.userInfo?.plan?.type &&
              [PlanType.monthly, PlanType.annual].includes(
                context.userInfo?.plan?.type,
              )
                ? 'Change Plan'
                : 'Upgrade to premium'
            }
            action={() => navigation.navigate('UpgradeToPremium')}
            leftIcon="logo-usd"
            isDisable={false}
            rightIcon="chevron-right"
          />

          {isGoogleAccount ? (
            <ProfileOption
              title="Reset Password"
              subTitle="Only available for MyPlayer accounts"
              action={() => navigation.navigate('ResetPassword')}
              leftIcon="basket"
              isDisable={true}
              rightIcon="chevron-right"
            />
          ) : (
            <ProfileOption
              title="Reset Password"
              action={() => navigation.navigate('ResetPassword')}
              leftIcon="basket"
              isDisable={false}
              rightIcon="chevron-right"
            />
          )}

          <ProfileOption
            title="Report Bug"
            action={() => navigation.navigate('ReportABug')}
            leftIcon="bug"
            isDisable={false}
            rightIcon="chevron-right"
          />

          <ProfileOption
            title="Restore my Saves"
            subTitle="Only available in premium accounts"
            action={() => console.log('action not implemented')}
            leftIcon="bookmark"
            isDisable={true}
            rightIcon="chevron-right"
          />
        </View>

        <View style={styles.part}>
          <Text style={[styles.subTitle, contentColor(context.theme)]}>
            Notifications
          </Text>
          <ProfileOption
            title="Email notification"
            subTitle="Only available for premium accounts"
            action={() => console.log('action not implemented')}
            leftIcon="mail"
            isDisable={true}
            toggle={{
              isOn: true,
            }}
          />

          <ProfileOption
            title="App notification"
            action={handleAppNotification}
            leftIcon="alarm"
            isDisable={false}
            toggle={{
              isOn: appNotification,
            }}
          />
        </View>

        <View style={styles.part}>
          <Text style={[styles.subTitle, contentColor(context.theme)]}>
            Setup
          </Text>
          <ProfileOption
            title="Logout"
            action={() => setModalVisible(true)}
            leftIcon={<Icon2 name="power" size={20} color={mainColor} />}
            isDisable={false}
          />
        </View>

        <ModalClass
          question="Are you sure, you want to logout?"
          modalVisible={modalVisible}
          btnTitle="Logout"
          handleMainBtn={handleLogOut}
          handleCancelBtn={() => setModalVisible(false)}
        />
      </PageWrapper>
    </ScrollView>
  );
});
