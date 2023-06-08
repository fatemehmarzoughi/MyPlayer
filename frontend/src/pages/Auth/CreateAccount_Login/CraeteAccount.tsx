import {
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {toastMessageDuration} from 'src/assets';
import React from 'react';
import Context from 'src/context/context';
import {contentColor} from 'src/components';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colors from 'src/assets/constants/Colors';
import {NavigationProp} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {Attributes, CountryCode, Plan, createAccount, getPlans} from 'src/API';
import {validateEmail, validatePassword} from 'src/pages';
import CountryPicker from 'react-native-country-picker-modal';

import {styles} from './style';
import {storeData} from 'src/LocalStorage';

export interface ICreateAccountProps {
  navigation: NavigationProp<any, any>;
}

export type ICreateAccountState = {
  passwordIconVisibility: 0 | 1;

  name: string;
  email: string;
  password: string;
  choosedPlanId: number;
  countryCode: CountryCode;

  plans?: Attributes<Plan>[];

  nameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;

  createingAccount: boolean;
};

export class CreateAccount extends React.PureComponent<
  ICreateAccountProps,
  ICreateAccountState
> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  constructor(props: ICreateAccountProps) {
    super(props);
    this.state = {
      countryCode: CountryCode.US,
      passwordIconVisibility: 0,

      name: '',
      email: '',
      password: '',
      choosedPlanId: 3,

      nameErrorMessage: '',

      emailErrorMessage: '',
      passwordErrorMessage: '',

      createingAccount: false,
    };
  }

  inputValidation = () => {
    let nameIsValid = false;
    let emailIsValid = false;
    let passwordIsValid = false;

    // name validation
    if (this.state.name === '') {
      this.setState({
        nameErrorMessage: 'Name is required',
        createingAccount: false,
      });
      nameIsValid = false;
    } else if (this.state.name.length < 2) {
      this.setState({
        nameErrorMessage: 'Name must be more than 2 characters',
        createingAccount: false,
      });
      nameIsValid = false;
    } else {
      this.setState({
        createingAccount: false,
      });
      nameIsValid = true;
    }

    // email validation
    if (this.state.email === '') {
      this.setState({
        emailErrorMessage: 'Email is required',
        createingAccount: false,
      });
      emailIsValid = false;
    } else if (!validateEmail(this.state.email)) {
      this.setState({
        emailErrorMessage: 'Please Enter a Valid Email',
        createingAccount: false,
      });
      emailIsValid = false;
    } else {
      this.setState({
        createingAccount: false,
      });
      emailIsValid = true;
    }

    // password validation
    if (this.state.password === '') {
      this.setState({
        passwordErrorMessage: 'Password is required',
        createingAccount: false,
      });
      passwordIsValid = false;
    } else if (!validatePassword(this.state.password)) {
      this.setState({
        passwordErrorMessage:
          'Password must be at least 5, at most 20 characters',
        createingAccount: false,
      });
      passwordIsValid = false;
    } else {
      this.setState({
        createingAccount: false,
      });
      passwordIsValid = true;
    }

    const result = nameIsValid && emailIsValid && passwordIsValid;
    return result;
  };

  handleCreateAccount = () => {
    this.setState({
      createingAccount: true,
    });

    if (!this.inputValidation()) return;

    createAccount({
      reqBody: {
        email: this.state.email,
        username: this.state.name,
        password: this.state.password,

        plan: {
          connect: [{id: this.state.choosedPlanId}],
        },
        // country: this.state.countryCode, TODO: solve country code problem on registration
      },
      onSuccess: async data => {
        this.setState({
          createingAccount: false,
        });
        await storeData('userId', data.user.id);
        await storeData('accessToken', data.jwt);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Registered Successfully',
          text2: 'Please Login',
          visibilityTime: toastMessageDuration,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.context.setIsLogin(true);
      },
      onError: err => {
        this.setState({
          createingAccount: false,
        });
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: err.message,
          text2: 'Please try again',
          visibilityTime: toastMessageDuration,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      },
    });
  };

  // handleCreateAccountWithGoogle = async () => {
  //   console.log('create account with google');

  //   const iosClientId = REACT_APP_IOS_CLIENT_ID;
  //   const webClientId = REACT_APP_ANDROID_CLIENT_ID;

  //   GoogleSignin.configure({
  //     webClientId,
  //     iosClientId,
  //   });

  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo);
  //     await storeData('accessToken', 'GoogleToken');
  //     this.context.setUserName(userInfo.user.givenName!);
  //     this.context.setUserEmail(userInfo.user.email);
  //     Toast.show({
  //       type: 'success',
  //       position: 'top',
  //       text1: 'Logged in Successfully',
  //       text2: 'Welcome to MyPlayer',
  //       visibilityTime: toastMessageDuration,
  //       autoHide: true,
  //       topOffset: 30,
  //       bottomOffset: 40,
  //     });
  //     this.context.setIsLogin(true);
  //     this.props.navigation.navigate('Profile');
  //   } catch (err: any) {
  //     switch (err.code) {
  //       case statusCodes.SIGN_IN_CANCELLED:
  //         Toast.show({
  //           type: 'error',
  //           position: 'bottom',
  //           text1: 'Create Account canceled',
  //           text2: 'Please try again',
  //           autoHide: true,
  //           visibilityTime: toastMessageDuration,
  //           topOffset: 30,
  //           bottomOffset: 40,
  //         });
  //         break;
  //       case statusCodes.IN_PROGRESS:
  //         Toast.show({
  //           type: 'error',
  //           position: 'bottom',
  //           text1: 'Create Account is in Progress',
  //           text2: 'Please wait',
  //           autoHide: true,
  //           topOffset: 30,
  //           bottomOffset: 40,
  //           visibilityTime: toastMessageDuration,
  //         });
  //         break;
  //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //         Toast.show({
  //           type: 'error',
  //           position: 'bottom',
  //           text1: 'Play services not available',
  //           text2: 'Please try again.',
  //           autoHide: true,
  //           topOffset: 30,
  //           bottomOffset: 40,
  //           visibilityTime: toastMessageDuration,
  //         });
  //         break;
  //     }
  //   }
  // };

  override async componentDidMount() {
    await getPlans({
      onSuccess: plans => {
        this.setState({
          plans: plans.data,
        });
      },
      onError: err => {
        console.log(err);
      },
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                                   Return                                   */
  /* -------------------------------------------------------------------------- */

  override render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* /* --------------------------------- Header --------------------------------- */}
          <Text style={[styles.mainTitle, contentColor(this.context.theme)]}>
            Create Account
          </Text>

          {/* /* --------------------------------- Inputs --------------------------------- */}
          <View style={styles.input}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Name"
              placeholderTextColor={
                this.context.theme ? Colors.gray : Colors.lightGray
              }
              onChangeText={input =>
                this.setState({
                  name: input,
                })
              }></TextInput>
            <Text
              style={[
                styles.errorMessage,
                {display: this.state.nameErrorMessage ? 'flex' : 'none'},
              ]}>
              {this.state.nameErrorMessage}
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Email"
              placeholderTextColor={
                this.context.theme ? Colors.gray : Colors.lightGray
              }
              onChangeText={input =>
                this.setState({
                  email: input,
                })
              }
              autoCapitalize="none"></TextInput>
            <Text
              style={[
                styles.errorMessage,
                {display: this.state.emailErrorMessage ? 'flex' : 'none'},
              ]}>
              {this.state.emailErrorMessage}
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Password"
              placeholderTextColor={
                this.context.theme ? Colors.gray : Colors.lightGray
              }
              secureTextEntry={!!!this.state.passwordIconVisibility}
              onChangeText={input =>
                this.setState({
                  password: input,
                })
              }></TextInput>
            <View style={styles.eyeIconsStyle}>
              <Icon
                onPress={() =>
                  this.setState({
                    passwordIconVisibility: 0,
                  })
                }
                style={[
                  styles.eyeIconStyle,
                  {opacity: this.state.passwordIconVisibility},
                ]}
                name="eye-outline"
                size={20}
                color={Colors.mainColor}
              />
              <Icon
                onPress={() =>
                  this.setState({
                    passwordIconVisibility: 1,
                  })
                }
                style={[
                  styles.eyeIconStyle,
                  {opacity: this.state.passwordIconVisibility ? 0 : 1},
                ]}
                name="eye-off-outline"
                size={20}
                color={Colors.mainColor}
              />
            </View>
            <Text
              style={[
                styles.errorMessage,
                {display: this.state.passwordErrorMessage ? 'flex' : 'none'},
              ]}>
              {this.state.passwordErrorMessage}
            </Text>
          </View>
          <View style={styles.input}>
            <TouchableOpacity style={styles.picker}>
              <Icon2 name="chevron-down" size={40} color={Colors.gray} />
              <CountryPicker
                preferredCountries={['US', 'GB']}
                withFilter={true}
                withCountryNameButton={true}
                withFlag={true}
                withEmoji={true}
                onSelect={val => {
                  this.setState({
                    countryCode: val.cca2 as unknown as CountryCode,
                  });
                }}
                countryCode={this.state.countryCode}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.planSection}>
            <Text style={[styles.planTitle, contentColor(this.context.theme)]}>
              Choose Your Plan
            </Text>
            <Text style={styles.planSubTitle}>
              By choosing our premium account, you can watch with no ads.
            </Text>
            <FlatList
              style={styles.plansFlatlist}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              data={this.state.plans}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      choosedPlanId: item.id,
                    });
                  }}
                  style={[
                    styles.planContainer,
                    this.state.choosedPlanId === item.id
                      ? {
                          borderColor: Colors.mainColor,
                          borderWidth: 3.5,
                        }
                      : {borderColor: Colors.gray},
                  ]}>
                  <Icon
                    style={[
                      styles.planIcon,
                      this.state.choosedPlanId === item.id
                        ? {color: Colors.mainColor}
                        : {color: Colors.gray},
                    ]}
                    name="checkmark-outline"
                    size={60}
                  />
                  <View style={styles.planTextContainer}>
                    <Text
                      style={[
                        styles.planText,
                        this.state.choosedPlanId === item.id
                          ? {fontWeight: 'bold'}
                          : {fontWeight: 'normal'},
                        contentColor(this.context.theme),
                      ]}>
                      {item.attributes.title}
                    </Text>
                    <Text
                      style={[
                        styles.planText,
                        this.state.choosedPlanId === item.id
                          ? {fontWeight: 'bold'}
                          : {fontWeight: 'normal'},
                        contentColor(this.context.theme),
                      ]}>
                      {item.attributes.price} $
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.description,
                      this.state.choosedPlanId === item.id
                        ? {color: Colors.mainColor}
                        : {color: Colors.gray},
                      contentColor(this.context.theme),
                    ]}>
                    {item.attributes.subTitle}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* /* ---------------------------------- Plans --------------------------------- */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.handleCreateAccount()}>
            <LottieView
              style={this.state.createingAccount ? {opacity: 1} : {opacity: 0}}
              loop={true}
              autoPlay={true}
              source={require('../../../assets/Images/loading.json')}
            />
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>

          {/* /* -------------------------------- Separator ------------------------------- */}
          <View style={styles.seperator}>
            <View style={styles.line}></View>
            <Text style={contentColor(this.context.theme)}>OR</Text>
            <View style={styles.line}></View>
          </View>

          {/* /* --------------------------------- Buttons -------------------------------- */}
          <TouchableOpacity
            // onPress={() => this.handleCreateAccountWithGoogle()}
            style={styles.googleBtn}>
            <Icon
              name="logo-google"
              size={30}
              color={Colors.mainColor}
              style={styles.googleLogo}
            />
            <Text style={contentColor(this.context.theme)}>
              Join with google for free
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
