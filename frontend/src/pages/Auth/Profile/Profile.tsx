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
import {contentColor, ModalClass, PageWrapper} from 'src/components';
import Context from 'src/context/context';
import {getData, storeData} from 'src/LocalStorage';
import Notification from 'src/Notification/NotificationSetup';
import ToggleSwitch from 'toggle-switch-react-native';

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
    } catch (err) {
      console.log(err);
    }
  }, [context]);

  const handleAppNotification = useCallback(async () => {
    const newState = '' + !appNotification + '';
    await storeData('appNotification', newState);
    setAppNotification(prev => !prev);
    if (!appNotification) {
      Notification.notifyOnMessage(new Date(Date.now() + 2000));
    }
  }, [appNotification]);

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
  }, [navigation, getUser]);

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

          <TouchableOpacity
            onPress={() => navigation.navigate('UpgradeToPremium')}
            style={[styles.option, {borderColor: white}]}>
            <View style={styles.optionTitleIcon}>
              <Icon2
                name="logo-usd"
                size={20}
                color={context.theme === 'light' ? dark : white}
              />
              <Text style={[styles.optionTitle, contentColor(context.theme)]}>
                {context.userInfo?.plan?.type &&
                [PlanType.monthly, PlanType.annual].includes(
                  context.userInfo?.plan?.type,
                )
                  ? 'Change Plan'
                  : 'Upgrade to premium'}
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={35}
              color={context.theme === 'light' ? dark : white}
            />
          </TouchableOpacity>

          {isGoogleAccount ? (
            <TouchableOpacity style={styles.premiumOption}>
              <View style={styles.premium}>
                <View style={styles.optionTitleIcon}>
                  <Icon2 name="basket" size={20} color={gray} />
                  <Text style={styles.premiumOptionTitle}>Reset Password</Text>
                </View>
                <Icon name="chevron-right" size={35} color={gray} />
              </View>
              <Text style={styles.premiumOptionText}>
                Only available for MyPlayer accounts
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}
              style={styles.option}>
              <View style={styles.optionTitleIcon}>
                <Icon2
                  name="basket"
                  size={20}
                  color={context.theme === 'light' ? dark : white}
                />
                <Text style={[styles.optionTitle, contentColor(context.theme)]}>
                  Reset Password
                </Text>
              </View>
              <Icon
                name="chevron-right"
                size={35}
                color={context.theme === 'light' ? dark : white}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('ReportABug')}
            style={styles.option}>
            <View style={styles.optionTitleIcon}>
              <Icon2
                name="bug"
                size={20}
                color={context.theme === 'light' ? dark : white}
              />
              <Text style={[styles.optionTitle, contentColor(context.theme)]}>
                Report Bug
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={35}
              color={context.theme === 'light' ? dark : white}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.premiumOption}>
            <View style={styles.premium}>
              <View style={styles.optionTitleIcon}>
                <Icon2 name="bookmark" size={20} color={gray} />
                <Text style={styles.premiumOptionTitle}>Restore my Saved</Text>
              </View>
              <Icon name="chevron-right" size={35} color={gray} />
            </View>
            <Text style={styles.premiumOptionText}>
              Only available in premium accounts
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.part}>
          <Text style={[styles.subTitle, contentColor(context.theme)]}>
            Notifications
          </Text>
          <TouchableOpacity style={styles.premiumOption}>
            <View style={styles.premium}>
              <View style={styles.optionTitleIcon}>
                <Icon2 name="mail" size={20} color={gray} />
                <Text style={styles.premiumOptionTitle}>
                  Email Notification
                </Text>
              </View>
              <ToggleSwitch
                isOn={true}
                onColor={gray}
                offColor={gray}
                size="small"
                onToggle={() => {}}
              />
            </View>
            <Text style={styles.premiumOptionText}>
              Only available in premium accounts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAppNotification}
            style={styles.option}>
            <View style={styles.optionTitleIcon}>
              <Icon2
                name="alarm"
                size={20}
                color={context.theme === 'light' ? dark : white}
              />
              <Text style={[styles.optionTitle, contentColor(context.theme)]}>
                App notification
              </Text>
            </View>
            <ToggleSwitch
              isOn={appNotification}
              onColor={mainColor}
              offColor={dark}
              size="small"
              onToggle={handleAppNotification}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.part}>
          <Text style={[styles.subTitle, contentColor(context.theme)]}>
            Setup
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.option}>
            <View style={styles.optionTitleIcon}>
              <Icon2 name="power" size={20} color={mainColor} />
              <Text style={[styles.optionTitle, contentColor(context.theme)]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
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
