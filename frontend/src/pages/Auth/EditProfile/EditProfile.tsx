import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CountryPicker, {
  TranslationLanguageCodeList,
  TranslationLanguageCodeMap,
} from 'react-native-country-picker-modal';
import {
  ModalClass,
  SavingModal,
  contentColor,
  backgroundColor,
} from 'src/components';
import React from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';
import {NavigationProp} from '@react-navigation/native';
import Context from 'src/context/context';
import {DELETE, POST, updateUser} from 'src/API';
import {storeData} from 'src/LocalStorage';
import {dark, gray, toastMessageDuration, white} from 'src/assets';

import {styles} from './style';

export interface IEditProfileProps {
  navigation: NavigationProp<any, any>;
}
export interface IEditProfileState {
  name: string;
  email: string;
  saving: boolean;
  modalVisible: boolean;
  countrySelectorVisibility: boolean;
  choosedCountry: string | TranslationLanguageCodeMap;
  countryCode?: string | TranslationLanguageCodeMap;
  countryFlag?: string;
}
export class EditProfile extends React.PureComponent<
  IEditProfileProps,
  IEditProfileState
> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  constructor(props: IEditProfileProps) {
    super(props);
    this.state = {
      modalVisible: false,
      countrySelectorVisibility: false,
      choosedCountry: TranslationLanguageCodeList['0'],
      name: '',
      email: '',
      saving: false,
    };
  }

  handleDeleteAccount = async () => {
    try {
      const result = await DELETE('/editProfile/deleteAccount');
      const message = await (result as any).text();

      if ((result as {status: number}).status === 200) {
        await storeData('accessToken', '');
        await storeData('userId', null);
        this.context.setIsLogin(false);
        this.props.navigation.navigate('Auth');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: message,
          text2: '',
          topOffset: 30,
          bottomOffset: 40,
          visibilityTime: toastMessageDuration,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: message,
          text2: 'Please try again',
          topOffset: 30,
          bottomOffset: 40,
          visibilityTime: toastMessageDuration,
          autoHide: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  onSave = async () => {
    this.setState({
      saving: true,
    });

    updateUser({
      reqBody: {
        email: this.state.email,
        username: this.state.name,
      },
      onSuccess: data => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Saved changes',
          autoHide: true,
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          saving: false,
        });
        this.props.navigation.navigate('Profile');
      },
      onError: err => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: String(err),
          text2: 'Please try again later',
          autoHide: true,
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          saving: false,
        });
      },
    });
  };
  
  override render() {
    return (
      <ScrollView>
        <View style={[styles.container]}>
          <View style={styles.header}>
            <View style={styles.row1}>
              <TouchableOpacity
                onPress={this.onSave}
                style={styles.btn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Profile')}
                style={styles.btn}>
                <Text
                  style={[styles.cancelText, contentColor(this.context.theme)]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.title}>Edit Profile</Text>
            </View>
          </View>

          <Image
            style={styles.image}
            source={{uri: this.context.userInfo?.avatar}}
          />
          <Text
            onPress={() => this.props.navigation.navigate('ChangeProfilePhoto')}
            style={[styles.changePhoto, contentColor(this.context.theme)]}>
            Change Profile Photo
          </Text>
          <View style={styles.inputs}>
            <TextInput
              placeholder={this.context.userInfo?.username}
              placeholderTextColor={this.context.theme ? dark : white}
              style={[styles.input, backgroundColor(this.context.theme)]}
              onChangeText={name =>
                this.setState({
                  name,
                })
              }
            />
            <TextInput
              placeholder={this.context.userInfo?.email}
              placeholderTextColor={this.context.theme ? dark : white}
              style={[styles.input, backgroundColor(this.context.theme)]}
              onChangeText={email =>
                this.setState({
                  email,
                })
              }
            />
            <TouchableOpacity
              style={[styles.input, backgroundColor(this.context.theme)]}
              onPress={() => this.setState({countrySelectorVisibility: true})}>
              <CountryPicker
                // theme={this.context.theme ? "" : DARK_THEME}
                preferredCountries={['US', 'IR']}
                withFilter={true}
                withCountryNameButton={true}
                withFlag={true}
                withEmoji={true}
                // placeholder={
                //   this.state.choosedCountry === ""
                //     ? this.context.userCountry
                //     : this.state.choosedCountry
                // }
                onSelect={val => {
                  this.setState({
                    countryCode: val.name,
                    choosedCountry: val.name,
                  });
                  this.setState({countryFlag: val.flag});
                }}
                onClose={() => {
                  this.setState({
                    countrySelectorVisibility: false,
                  });
                }}
                visible={this.state.countrySelectorVisibility}
                countryCode={'AF'}
              />
              <Icon name="chevron-down" size={40} color={gray} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                modalVisible: true,
              })
            }
            style={[styles.deleteBtn, backgroundColor(this.context.theme)]}>
            <Text style={[styles.deleteBtnText]}>Delete Account</Text>
          </TouchableOpacity>
          {/* <ModalClass
            question="Are you sure, you want to delete your account?"
            modalVisible={this.state.modalVisible}
            btnTitle="Delete Account"
            handleMainBtn={() => this.handleDeleteAccount()}
            handleCancelBtn={() =>     this.setState({
      modalVisible: false,
    })}
          />
          <SavingModal modalVisible={this.state.saving} /> */}
        </View>
      </ScrollView>
    );
  }
}
