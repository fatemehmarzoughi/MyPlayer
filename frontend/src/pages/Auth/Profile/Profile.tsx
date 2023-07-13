import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React from 'react';
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
import {getUserInfo} from 'src/API';
import {dark, gray, mainColor, toastMessageDuration, white} from 'src/assets';
import {contentColor,ModalClass, PageWrapper} from 'src/components';
import Context from 'src/context/context';
import {getData, storeData} from 'src/LocalStorage';
import Notification from 'src/Notification/NotificationSetup';
import ToggleSwitch from 'toggle-switch-react-native';

import {styles} from './style';

export interface IProfileProps extends ParamListBase {
  navigation: NavigationProp<any, any>;
}
export interface IProfileState {
  refreshing: boolean;
  modalVisible: boolean;
  isGoogleAccount: boolean;
  appNotification: boolean;
}
export class Profile extends React.PureComponent<IProfileProps, IProfileState> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  focusListener: any;

  constructor(props: IProfileProps) {
    super(props);
    this.state = {
      appNotification: true,
      refreshing: false,
      modalVisible: false,
      isGoogleAccount: false,
    };
  }

  handleLogOut = async () => {
    try {
      const accessToken = await getData('accessToken');
      if (accessToken === 'GoogleToken') {
        await GoogleSignin.signOut();
      }
      await storeData('accessToken', null);
      await storeData('userId', null);
      /* ------ DO NOT CHANGE THE POSITION OF THIS CODE (THE APP WILL CRASH) ------ */
      this.setState({
        modalVisible: false,
      });
      this.context.setIsLogin(false);
      /* ---------------------------------- **** ---------------------------------- */
    } catch (err) {
      console.log(err);
    }
  };

  setAppNotification = async () => {
    const newState = '' + !this.state.appNotification + '';
    await storeData('appNotification', newState);
    this.setState({
      appNotification: !this.state.appNotification,
    });
    if (!this.state.appNotification) {
      Notification.notifyOnMessage(new Date(Date.now() + 2 * 1000));
    }
  };

  getUser = async () => {
    await getUserInfo({
      onSuccess: data => {
        this.context.setUserInfo(data);
        this.setState({refreshing: false});
      },
      onError: err => {
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
        this.setState({refreshing: false});
      },
    });
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.getUser();
  };

  override async componentDidMount() {
    setTimeout(async () => {
      await this.getUser();
    }, 1000);

    this.focusListener = this.props.navigation?.addListener(
      'focus',
      async () => {
        await this.getUser();
      },
    );

    const appNotification = await getData('appNotification');
    appNotification === 'false'
      ? this.setState({appNotification: false})
      : this.setState({appNotification: true});
  }

  override render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        <PageWrapper>
          <View style={styles.header}>
            <Text style={[styles.title, contentColor(this.context.theme)]}>
              Profile
            </Text>
            <View style={styles.row1}>
              <Image
                style={styles.profileImg}
                source={{uri: this.context.userInfo?.avatar}}
              />
              <View style={styles.nameEmail}>
                <>
                  {(this.context.userInfo?.email === '' &&
                    this.context.userInfo?.username === '') ||
                  (this.context.userInfo?.email === undefined &&
                    this.context.userInfo?.username === undefined) ? (
                    <>
                      <Spinner
                        size={'lg'}
                        accessibilityLabel="Loading posts"
                        color="warning.500"
                        style={styles.loadingIcon}
                      />
                    </>
                  ) : (
                    <>
                      <View style={styles.name}>
                        <Icon2
                          name="person"
                          size={25}
                          color={this.context.theme === 'light' ? dark : white}
                        />
                        <Text
                          style={[
                            styles.nameText,
                            contentColor(this.context.theme),
                          ]}>
                          {this.context.userInfo?.username}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.email,
                          contentColor(this.context.theme),
                        ]}>
                        {this.context.userInfo?.email}
                      </Text>
                    </>
                  )}
                </>
              </View>
            </View>
            <View style={styles.row2}>
              <View style={styles.My}>
                <Text style={[styles.MyText, contentColor(this.context.theme)]}>
                  12
                </Text>
                <Text style={[styles.MyText, contentColor(this.context.theme)]}>
                  My Saved
                </Text>
              </View>
              <View style={styles.My}>
                <Text style={[styles.MyText, contentColor(this.context.theme)]}>
                  2
                </Text>
                <Text style={[styles.MyText, contentColor(this.context.theme)]}>
                  My playlist
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfile')}
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
            <Text style={[styles.subTitle, contentColor(this.context.theme)]}>
              Account Settings
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UpgradeToPremium')}
              style={[styles.option, {borderColor: white}]}>
              <View style={styles.optionTitleIcon}>
                <Icon2
                  name="logo-usd"
                  size={20}
                  color={this.context.theme === 'light' ? dark : white}
                />
                <Text
                  style={[
                    styles.optionTitle,
                    contentColor(this.context.theme),
                  ]}>
                  Upgrade to premium
                </Text>
              </View>
              <Icon
                name="chevron-right"
                size={35}
                color={this.context.theme === 'light' ? dark : white}
              />
            </TouchableOpacity>

            <>
              {this.state.isGoogleAccount ? (
                <TouchableOpacity style={styles.premiumOption}>
                  <View style={styles.premium}>
                    <View style={styles.optionTitleIcon}>
                      <Icon2 name="basket" size={20} color={gray} />
                      <Text style={styles.premiumOptionTitle}>
                        Reset Password
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={35} color={gray} />
                  </View>
                  <Text style={styles.premiumOptionText}>
                    Only available for MyPlayer accounts
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ResetPassword')
                  }
                  style={styles.option}>
                  <View style={styles.optionTitleIcon}>
                    <Icon2
                      name="basket"
                      size={20}
                      color={this.context.theme === 'light' ? dark : white}
                    />
                    <Text
                      style={[
                        styles.optionTitle,
                        contentColor(this.context.theme),
                      ]}>
                      Reset Password
                    </Text>
                  </View>
                  <Icon
                    name="chevron-right"
                    size={35}
                    color={this.context.theme === 'light' ? dark : white}
                  />
                </TouchableOpacity>
              )}
            </>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ReportABug')}
              style={styles.option}>
              <View style={styles.optionTitleIcon}>
                <Icon2
                  name="bug"
                  size={20}
                  color={this.context.theme === 'light' ? dark : white}
                />
                <Text
                  style={[
                    styles.optionTitle,
                    contentColor(this.context.theme),
                  ]}>
                  Report Bug
                </Text>
              </View>
              <Icon
                name="chevron-right"
                size={35}
                color={this.context.theme === 'light' ? dark : white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.premiumOption}>
              <View style={styles.premium}>
                <View style={styles.optionTitleIcon}>
                  <Icon2 name="bookmark" size={20} color={gray} />
                  <Text style={styles.premiumOptionTitle}>
                    Restore my Saved
                  </Text>
                </View>
                <Icon name="chevron-right" size={35} color={gray} />
              </View>
              <Text style={styles.premiumOptionText}>
                Only available in premium accounts
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.part}>
            <Text style={[styles.subTitle, contentColor(this.context.theme)]}>
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
                {/* <Icon2 name="toggle" size={35} color={gray}/> */}
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
              onPress={() => this.setAppNotification()}
              style={styles.option}>
              <View style={styles.optionTitleIcon}>
                <Icon2
                  name="alarm"
                  size={20}
                  color={this.context.theme === 'light' ? dark : white}
                />
                <Text
                  style={[
                    styles.optionTitle,
                    contentColor(this.context.theme),
                  ]}>
                  App notification
                </Text>
              </View>
              <ToggleSwitch
                isOn={this.state.appNotification}
                onColor={mainColor}
                offColor={dark}
                size="small"
                onToggle={() => this.setAppNotification()}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.part}>
            <Text style={[styles.subTitle, contentColor(this.context.theme)]}>
              Setup
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  modalVisible: true,
                });
              }}
              style={styles.option}>
              <View style={styles.optionTitleIcon}>
                <Icon2 name="power" size={20} color={mainColor} />
                <Text
                  style={[
                    styles.optionTitle,
                    contentColor(this.context.theme),
                  ]}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ModalClass
            question="Are you sure, you want to logout?"
            modalVisible={this.state.modalVisible}
            btnTitle="Logout"
            handleMainBtn={this.handleLogOut}
            handleCancelBtn={() => {
              this.setState({
                modalVisible: false,
              });
            }}
          />
        </PageWrapper>
      </ScrollView>
    );
  }
}
