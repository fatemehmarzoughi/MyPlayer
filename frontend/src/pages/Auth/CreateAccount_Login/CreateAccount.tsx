import {NavigationProp} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Toast from 'react-native-toast-message';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Attributes, CountryCode, createAccount, getPlans, Plan} from 'src/API';
import {toastMessageDuration} from 'src/assets';
import * as Colors from 'src/assets/constants/Colors';
import {contentColor} from 'src/components';
import Context from 'src/context/context';
import {storeData} from 'src/LocalStorage';
import {validateEmail, validatePassword} from 'src/pages';

import {styles} from './style';

export interface ICreateAccountProps {
  navigation: NavigationProp<any, any>;
}

export type ICreateAccountState = {
  passwordIconVisibility: 0 | 1;

  refreshing: boolean;

  name: string;
  email: string;
  password: string;
  chosePlanId: number;
  countryCode: CountryCode;

  plans?: Attributes<Plan>[];

  nameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;

  creatingAccount: boolean;
};

export const CreateAccount = React.memo<ICreateAccountProps>(() => {
  const context = useContext(Context);

  const [countryCode, setCountryCode] = useState(CountryCode.US);
  const [passwordIconVisibility, setPasswordIconVisibility] =
    useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [plans, setPlans] = useState<Attributes<Plan>[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [chosePlanId, setChosePlanId] = useState<number>(3);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [creatingAccount, setCreatingAccount] = useState<boolean>(false);

  const inputValidation = useCallback(() => {
    let nameIsValid = false;
    let emailIsValid = false;
    let passwordIsValid = false;

    // name validation
    if (name === '') {
      setNameErrorMessage('Name is required');
      setCreatingAccount(false);
      nameIsValid = false;
    } else if (name.length < 2) {
      setNameErrorMessage('Name must be more than 2 characters');
      setCreatingAccount(false);
      nameIsValid = false;
    } else {
      setCreatingAccount(false);
      nameIsValid = true;
    }

    // email validation
    if (email === '') {
      setEmailErrorMessage('Email is required');
      setCreatingAccount(false);
      emailIsValid = false;
    } else if (!validateEmail(email)) {
      setEmailErrorMessage('Please Enter a Valid Email');
      setCreatingAccount(false);
      emailIsValid = false;
    } else {
      setCreatingAccount(false);
      emailIsValid = true;
    }

    // password validation
    if (password === '') {
      setPasswordErrorMessage('Password is required');
      setCreatingAccount(false);
      passwordIsValid = false;
    } else if (!validatePassword(password)) {
      setPasswordErrorMessage(
        'Password must be at least 5, at most 20 characters',
      );
      setCreatingAccount(false);
      passwordIsValid = false;
    } else {
      setCreatingAccount(false);
      passwordIsValid = true;
    }

    const result = nameIsValid && emailIsValid && passwordIsValid;
    return result;
  }, [email, name, password]);

  const handleCreateAccount = useCallback(() => {
    setCreatingAccount(true);

    if (!inputValidation()) return;

    createAccount({
      reqBody: {
        email: email,
        username: name,
        password: password,

        plan: {
          connect: [{id: chosePlanId}],
        },
        // country: countryCode, TODO: solve country code problem on registration
      },
      onSuccess: async data => {
        setCreatingAccount(false);
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
        context.setIsLogin(true);
      },
      onError: err => {
        setCreatingAccount(false);
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
  }, [chosePlanId, context, email, inputValidation, name, password]);

  const onGetPlans = useCallback(() => {
    const init = async () => {
      setRefreshing(true);
      await getPlans({
        onSuccess: plans => {
          console.log(plans);
          setPlans(plans.data);
          setRefreshing(false);
        },
        onError: err => {
          console.log(err);
          setRefreshing(false);
        },
      });
    };
    init();
  }, []);

  useEffect(() => {
    onGetPlans();
  }, [onGetPlans]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onGetPlans} />
      }>
      <View style={styles.container}>
        {/* /* --------------------------------- Header --------------------------------- */}
        <Text style={[styles.mainTitle, contentColor(context.theme)]}>
          Create Account
        </Text>

        {/* /* --------------------------------- Inputs --------------------------------- */}
        <View style={styles.input}>
          <TextInput
            style={[styles.textInput, contentColor(context.theme)]}
            placeholder="Name"
            placeholderTextColor={
              context.theme === 'light' ? Colors.gray : Colors.lightGray
            }
            onChangeText={input => setName(input)}></TextInput>
          <Text
            style={[
              styles.errorMessage,
              {display: nameErrorMessage ? 'flex' : 'none'},
            ]}>
            {nameErrorMessage}
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={[styles.textInput, contentColor(context.theme)]}
            placeholder="Email"
            placeholderTextColor={
              context.theme === 'light' ? Colors.gray : Colors.lightGray
            }
            onChangeText={input => setEmail(input)}
            autoCapitalize="none"></TextInput>
          <Text
            style={[
              styles.errorMessage,
              {display: emailErrorMessage ? 'flex' : 'none'},
            ]}>
            {emailErrorMessage}
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={[styles.textInput, contentColor(context.theme)]}
            placeholder="Password"
            placeholderTextColor={
              context.theme === 'light' ? Colors.gray : Colors.lightGray
            }
            secureTextEntry={!passwordIconVisibility}
            onChangeText={input => setPassword(input)}></TextInput>
          <View style={styles.eyeIconsStyle}>
            <Icon
              onPress={() => setPasswordIconVisibility(0)}
              style={[styles.eyeIconStyle, {opacity: passwordIconVisibility}]}
              name="eye-outline"
              size={20}
              color={Colors.mainColor}
            />
            <Icon
              onPress={() => setPasswordIconVisibility(1)}
              style={[
                styles.eyeIconStyle,
                {opacity: passwordIconVisibility ? 0 : 1},
              ]}
              name="eye-off-outline"
              size={20}
              color={Colors.mainColor}
            />
          </View>
          <Text
            style={[
              styles.errorMessage,
              {display: passwordErrorMessage ? 'flex' : 'none'},
            ]}>
            {passwordErrorMessage}
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
              theme={{
                onBackgroundTextColor:
                  context.theme === 'dark' ? Colors.lightGray : Colors.gray,
              }}
              onSelect={val => {
                setCountryCode(val.cca2 as unknown as CountryCode);
              }}
              countryCode={countryCode}
            />
          </TouchableOpacity>
        </View>
        {plans ? (
          <View style={styles.planSection}>
            <Text style={[styles.planTitle, contentColor(context.theme)]}>
              Choose Your Plan
            </Text>
            <Text style={styles.planSubTitle}>
              By choosing our premium account, you can watch with no ads.
            </Text>
            <FlatList
              style={styles.plansFlatlist}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              data={plans}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setChosePlanId(item.id);
                  }}
                  style={[
                    styles.planContainer,
                    chosePlanId === item.id
                      ? {
                          borderColor: Colors.mainColor,
                          borderWidth: 3.5,
                        }
                      : {borderColor: Colors.gray},
                  ]}>
                  <Icon
                    style={[
                      styles.planIcon,
                      chosePlanId === item.id
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
                        chosePlanId === item.id
                          ? {fontWeight: 'bold'}
                          : {fontWeight: 'normal'},
                        contentColor(context.theme),
                      ]}>
                      {item.attributes.title}
                    </Text>
                    <Text
                      style={[
                        styles.planText,
                        chosePlanId === item.id
                          ? {fontWeight: 'bold'}
                          : {fontWeight: 'normal'},
                        contentColor(context.theme),
                      ]}>
                      {item.attributes.price} $
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.description,
                      chosePlanId === item.id
                        ? {color: Colors.mainColor}
                        : {color: Colors.gray},
                      contentColor(context.theme),
                    ]}>
                    {item.attributes.subTitle}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <></>
        )}

        {/* /* ---------------------------------- Plans --------------------------------- */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleCreateAccount()}>
          {creatingAccount ? (
            <Spinner
              size="sm"
              accessibilityLabel="Loading posts"
              color="warning.100"
              style={{
                alignSelf: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            />
          ) : (
            <Text style={styles.btnText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* /* -------------------------------- Separator ------------------------------- */}
        <View style={styles.seperator}>
          <View style={styles.line}></View>
          <Text style={contentColor(context.theme)}>OR</Text>
          <View style={styles.line}></View>
        </View>

        {/* /* --------------------------------- Buttons -------------------------------- */}
        <TouchableOpacity
          // onPress={() => handleCreateAccountWithGoogle()}
          style={styles.googleBtn}>
          <Icon
            name="logo-google"
            size={30}
            color={Colors.mainColor}
            style={styles.googleLogo}
          />
          <Text style={contentColor(context.theme)}>
            Join with google for free
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});
