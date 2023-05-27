import {
  statusCodes,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import React from "react";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationScreenProp } from "react-navigation";
import Icon2 from "react-native-vector-icons/EvilIcons";
import CountryPicker, {
  TranslationLanguageCodeMap,
} from "react-native-country-picker-modal";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  validateEmail,
  validatePassword,
} from "@/pages/Auth/CreateAccount_Login/validation";
import {
  REACT_APP_IOS_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID,
} from "@/assets/constants/General";
import { POST } from "@/API/index";
import Context from "@/context/context";
import * as Colors from "@/assets/constants/Colors";
import { changeColor } from "@/components/lightDarkTheme";
import { storeData } from "@/LocalStorage/AsyncStorageData";
import { toastMessageDuration } from "@/assets/constants/Units";

import { styles } from "./style";

export interface ICreateAccountProps extends NavigationScreenProp<any, any> {
  navigation: NavigationScreenProp<any, any>;
}

export type ICreateAccountState = {
  countryCode: string | TranslationLanguageCodeMap;
  countrySelectorVisibility: boolean;
  passwordIconNotVisible: 0 | 1;
  passwordIconVisible: 0 | 1;
  isVisible: boolean;
  passwordIsSecure: boolean;

  activeColor: string;
  notActiveColor: string;

  activeWeight: "bold";
  notActiveWeight: "normal";

  selectedId: number;

  plans: {
    id: number;
    name: string;
    price: string;
    description: string;
  }[];

  name: string;
  email: string;
  password: string;
  choosedCountry: string | TranslationLanguageCodeMap;
  choosedPlan: number;

  nameErrorMessage: string;
  nameErrorDisplay: "none" | "flex";

  emailErrorMessage: string;
  passwordErrorMessage: string;
  emailErrorDisplay: "none" | "flex";
  passwordErrorDisplay: "none" | "flex";

  createingAccount: boolean;
};

export default class CreateAccount extends React.Component<
  ICreateAccountProps,
  ICreateAccountState
> {
  declare context: React.ContextType<typeof Context>;

  constructor(props: ICreateAccountProps) {
    super(props);
    this.state = {
      countryCode: "Your Country (Optional)",
      countrySelectorVisibility: false,
      passwordIconNotVisible: 0,
      passwordIconVisible: 1,
      isVisible: true,
      passwordIsSecure: true,

      activeColor: Colors.mainColor,
      notActiveColor: Colors.gray,

      activeWeight: "bold",
      notActiveWeight: "normal",

      selectedId: 0,

      plans: [
        {
          id: 0,
          name: "Free",
          price: "0.0$",
          description: "Free Account",
        },
        {
          id: 1,
          name: "30 Days",
          price: "30.0$",
          description: "Premium Account",
        },
        {
          id: 2,
          name: "365 Days",
          price: "9.0$",
          description: "Premium Account",
        },
      ],

      name: "",
      email: "",
      password: "",
      choosedCountry: "",
      choosedPlan: 0,

      nameErrorMessage: "",
      nameErrorDisplay: "none",

      emailErrorMessage: "",
      passwordErrorMessage: "",
      emailErrorDisplay: "none",
      passwordErrorDisplay: "none",

      createingAccount: false,
    };
  }

  passwordVisibility = () => {
    if (this.state.isVisible) {
      this.setState({
        passwordIconNotVisible: 1,
        passwordIconVisible: 0,
        isVisible: false,
        passwordIsSecure: false,
      });
    } else {
      this.setState({
        passwordIconNotVisible: 0,
        passwordIconVisible: 1,
        isVisible: true,
        passwordIsSecure: true,
      });
    }
  };

  selectPlan = (id: number) => {
    this.setState({
      selectedId: id,
      choosedPlan: id,
    });
  };

  handleNameInput = (input: string) => {
    this.setState({
      name: input,
    });
  };

  handleEmailInput = (input: string) => {
    this.setState({
      email: input,
    });
  };

  handlePasswordInput = (input: string) => {
    this.setState({
      password: input,
    });
  };

  inputValidation = () => {
    let nameIsValid = false;
    let emailIsValid = false;
    let passwordIsValid = false;

    // name validation
    if (this.state.name === "") {
      this.setState({
        nameErrorDisplay: "flex",
        nameErrorMessage: "Name is required",
        createingAccount: false,
      });
      nameIsValid = false;
    } else if (this.state.name.length < 2) {
      this.setState({
        nameErrorDisplay: "flex",
        nameErrorMessage: "Name must be more than 2 characters",
        createingAccount: false,
      });
      nameIsValid = false;
    } else {
      this.setState({
        nameErrorDisplay: "none",
        createingAccount: false,
      });
      nameIsValid = true;
    }

    // email validation
    if (this.state.email === "") {
      this.setState({
        emailErrorDisplay: "flex",
        emailErrorMessage: "Email is required",
        createingAccount: false,
      });
      emailIsValid = false;
    } else if (!validateEmail(this.state.email)) {
      this.setState({
        emailErrorDisplay: "flex",
        emailErrorMessage: "Please Enter a Valid Email",
        createingAccount: false,
      });
      emailIsValid = false;
    } else {
      this.setState({
        emailErrorDisplay: "none",
        createingAccount: false,
      });
      emailIsValid = true;
    }

    // password validation
    if (this.state.password === "") {
      this.setState({
        passwordErrorMessage: "Password is required",
        passwordErrorDisplay: "flex",
        createingAccount: false,
      });
      passwordIsValid = false;
    } else if (!validatePassword(this.state.password)) {
      this.setState({
        passwordErrorMessage:
          "Password must be at least 5, at most 20 characters",
        passwordErrorDisplay: "flex",
        createingAccount: false,
      });
      passwordIsValid = false;
    } else {
      this.setState({
        passwordErrorDisplay: "none",
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

    console.log(this.state.email);

    if (!this.inputValidation()) return;

    POST("/signin/addUser", {
      firstName: this.state.name,
      email: this.state.email,
      password: this.state.password,
      plan: this.state.choosedPlan,
      country: this.state.choosedCountry,
    })
      .then(async (res) => {
        console.log(res.status);
        if (res.status === 200) {
          this.setState({
            createingAccount: false,
          });
          Toast.show({
            type: "success",
            position: "top",
            text1: "Registered Successfully",
            text2: "Please Login",
            visibilityTime: toastMessageDuration,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        } else {
          this.setState({
            createingAccount: false,
          });
          const message = await res.json();
          console.log(message);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: message.message,
            text2: "Please try again",
            visibilityTime: toastMessageDuration,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      })
      .catch((err) => {
        this.setState({
          createingAccount: false,
        });
        console.log(err);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Something went wrong",
          text2: "Please try again",
          visibilityTime: toastMessageDuration,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      });
  };

  handleCreateAccountWithGoogle = async () => {
    console.log("create account with google");

    const iosClientId = REACT_APP_IOS_CLIENT_ID;
    const webClientId = REACT_APP_ANDROID_CLIENT_ID;

    GoogleSignin.configure({
      webClientId,
      iosClientId,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      await storeData("accessToken", "GoogleToken");
      this.context.setUserName(userInfo.user.givenName!);
      this.context.setUserEmail(userInfo.user.email);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Logged in Successfully",
        text2: "Welcome to MyPlayer",
        visibilityTime: toastMessageDuration,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      this.context.setIsLogin(true);
      this.props.navigation.navigate("Profile");
    } catch (err: any) {
      switch (err.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Create Account canceled",
            text2: "Please try again",
            autoHide: true,
            visibilityTime: toastMessageDuration,
            topOffset: 30,
            bottomOffset: 40,
          });
          break;
        case statusCodes.IN_PROGRESS:
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Create Account is in Progress",
            text2: "Please wait",
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            visibilityTime: toastMessageDuration,
          });
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Play services not available",
            text2: "Please try again.",
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            visibilityTime: toastMessageDuration,
          });
          break;
      }
    }
  };

  override render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.mainTitle, changeColor(this.context.theme)]}>
            Create Account
          </Text>
          <View style={styles.input}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Name"
              placeholderTextColor={
                this.context.theme ? Colors.gray : Colors.lightGray
              }
              onChangeText={(input) => this.handleNameInput(input)}
            ></TextInput>
            <Text
              style={[
                styles.errorMessage,
                { display: this.state.nameErrorDisplay },
              ]}
            >
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
              onChangeText={(input) => this.handleEmailInput(input)}
              autoCapitalize="none"
            ></TextInput>
            <Text
              style={[
                styles.errorMessage,
                { display: this.state.emailErrorDisplay },
              ]}
            >
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
              secureTextEntry={this.state.passwordIsSecure}
              onChangeText={(input) => this.handlePasswordInput(input)}
            ></TextInput>
            <View style={styles.eyeIconsStyle}>
              <Icon
                onPress={() => this.passwordVisibility()}
                style={[
                  styles.eyeIconStyle,
                  { opacity: this.state.passwordIconNotVisible },
                ]}
                name="eye-outline"
                size={20}
                color={Colors.mainColor}
              />
              <Icon
                onPress={() => this.passwordVisibility()}
                style={[
                  styles.eyeIconStyle,
                  { opacity: this.state.passwordIconVisible },
                ]}
                name="eye-off-outline"
                size={20}
                color={Colors.mainColor}
              />
            </View>
            <Text
              style={[
                styles.errorMessage,
                { display: this.state.passwordErrorDisplay },
              ]}
            >
              {this.state.passwordErrorMessage}
            </Text>
          </View>
          <View style={styles.input}>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => {
                this.setState({ countrySelectorVisibility: true });
              }}
            >
              <Icon2 name="chevron-down" size={40} color={Colors.gray} />
              <View>
                <Text style={styles.text}>this.state.countryCode</Text>
                {/* <Icon2 name="chevron-down" size={40} color={gray}/> */}
              </View>
            </TouchableOpacity>
            <CountryPicker
              preferredCountries={["US", "GB"]}
              withFilter={true}
              withCountryNameButton={true}
              withFlag={true}
              withEmoji={true}
              onSelect={(val) => {
                this.setState({
                  countryCode: val.name,
                  choosedCountry: val.name,
                });
                // this.setState({ countryFlag: val.flag });
              }}
              onClose={() => {
                this.setState({
                  countrySelectorVisibility: false,
                });
              }}
              visible={this.state.countrySelectorVisibility}
              countryCode={"AF"}
            />
          </View>
          <View style={styles.planSection}>
            <Text style={[styles.planTitle, changeColor(this.context.theme)]}>
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.selectPlan(item.id)}
                  style={[
                    styles.planContainer,
                    this.state.selectedId === item.id
                      ? {
                          borderColor: this.state.activeColor,
                          borderWidth: 3.5,
                        }
                      : { borderColor: this.state.notActiveColor },
                  ]}
                >
                  <Icon
                    style={[
                      styles.planIcon,
                      this.state.selectedId === item.id
                        ? { color: this.state.activeColor }
                        : { color: this.state.notActiveColor },
                    ]}
                    name="checkmark-outline"
                    size={60}
                  />
                  <View style={styles.planTextContainer}>
                    <Text
                      style={[
                        styles.planText,
                        this.state.selectedId === item.id
                          ? { fontWeight: this.state.activeWeight }
                          : { fontWeight: this.state.notActiveWeight },
                        changeColor(this.context.theme),
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.planText,
                        this.state.selectedId === item.id
                          ? { fontWeight: this.state.activeWeight }
                          : { fontWeight: this.state.notActiveWeight },
                        changeColor(this.context.theme),
                      ]}
                    >
                      {item.price}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.description,
                      this.state.selectedId === item.id
                        ? { color: this.state.activeColor }
                        : { color: this.state.notActiveColor },
                      changeColor(this.context.theme),
                    ]}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.handleCreateAccount()}
          >
            <LottieView
              style={
                this.state.createingAccount ? { opacity: 1 } : { opacity: 0 }
              }
              loop={true}
              autoPlay={true}
              source={require("../../../assets/Images/loading.json")}
            />
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.seperator}>
            <View style={styles.line}></View>
            <Text style={changeColor(this.context.theme)}>OR</Text>
            <View style={styles.line}></View>
          </View>

          <TouchableOpacity
            onPress={() => this.handleCreateAccountWithGoogle()}
            style={styles.googleBtn}
          >
            <Icon
              name="logo-google"
              size={30}
              color={Colors.mainColor}
              style={styles.googleLogo}
            />
            <Text style={changeColor(this.context.theme)}>
              Join with google for free
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
