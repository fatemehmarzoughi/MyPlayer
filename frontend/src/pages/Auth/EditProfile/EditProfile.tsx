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
  backgroundColor
} from 'src/components';
import React from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';
import {NavigationProp} from '@react-navigation/native';
import Context from 'src/context/context';
import {DELETE, POST} from 'src/API';
import {storeData} from 'src/LocalStorage';
import {dark, gray, toastMessageDuration, white} from 'src/assets';

import {styles} from './style';

export interface IEditProfileProps extends NavigationProp<any, any> {
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

  changeProfilePhoto = () => {
    this.props.navigation.navigate('ChangeProfilePhoto');
  };

  onCancel = () => {
    console.log('cancel pressed');
    this.props.navigation.navigate('Profile');
  };

  cancelModal = () => {
    console.log('cancel modal');
    this.setState({
      modalVisible: false,
    });
  };

  handleDeleteAccount = async () => {
    try {
      const result = await DELETE('/editProfile/deleteAccount');
      const message = await (result as any).text();

      if ((result as {status: number}).status === 200) {
        await storeData('accessToken', '');
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

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleName = (name: string) => {
    this.setState({
      name,
    });
  };

  handleEmail = (email: string) => {
    this.setState({
      email,
    });
  };

  // onSave = async () => {
  //   this.setState({
  //     saving: true,
  //   });

  //   const reqBodyUserInfo = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     country: this.state.choosedCountry,
  //     imageURL: this.context.userImage,
  //   };

  //   try {
  //     // saving the users info (name, email, country)
  //     const result = await POST('/editProfile/setInfo', reqBodyUserInfo);
  //     const message = await result.text();

  //     if (result.status === 200) {
  //       Toast.show({
  //         type: 'success',
  //         position: 'top',
  //         text1: message,
  //         text2: 'Saved changes',
  //         autoHide: true,
  //         visibilityTime: toastMessageDuration,
  //         topOffset: 30,
  //         bottomOffset: 40,
  //       });
  //       this.setState({
  //         saving: false,
  //       });
  //       this.props.navigation.navigate('Profile');
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         position: 'bottom',
  //         text1: message,
  //         text2: 'Please try again',
  //         autoHide: true,
  //         visibilityTime: toastMessageDuration,
  //         topOffset: 30,
  //         bottomOffset: 40,
  //       });
  //       this.setState({
  //         saving: false,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     Toast.show({
  //       type: 'error',
  //       position: 'bottom',
  //       text1: 'Something went wrong',
  //       text2: 'Please check your internet connection',
  //       autoHide: true,
  //       visibilityTime: toastMessageDuration,
  //       topOffset: 30,
  //       bottomOffset: 40,
  //     });
  //     this.setState({
  //       saving: false,
  //     });
  //   }
  // };

  override shouldComponentUpdate(
    nextProps: IEditProfileProps,
    nextState: IEditProfileState,
  ) {
    if (this.props !== nextProps) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  override render() {
    return (
      <ScrollView>
        <View style={[styles.container]}>
          <View style={styles.header}>
            <View style={styles.row1}>
              <TouchableOpacity
                // onPress={() => this.onSave()}
                style={styles.btn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onCancel()}
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

          <Image style={styles.image} source={{uri: this.context.userImage}} />
          <Text
            onPress={() => this.changeProfilePhoto()}
            style={[styles.changePhoto, contentColor(this.context.theme)]}>
            Change Profile Photo
          </Text>
          <View style={styles.inputs}>
            <TextInput
              placeholder={this.context.userName}
              placeholderTextColor={this.context.theme ? dark : white}
              style={[styles.input, backgroundColor(this.context.theme)]}
              onChangeText={input => this.handleName(input)}
            />
            <TextInput
              placeholder={this.context.userEmail}
              placeholderTextColor={this.context.theme ? dark : white}
              style={[styles.input, backgroundColor(this.context.theme)]}
              onChangeText={input => this.handleEmail(input)}
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
            onPress={() => this.showModal()}
            style={[
              styles.deleteBtn,
              backgroundColor(this.context.theme),
            ]}>
            <Text style={[styles.deleteBtnText]}>Delete Account</Text>
          </TouchableOpacity>
          {/* <ModalClass
            question="Are you sure, you want to delete your account?"
            modalVisible={this.state.modalVisible}
            btnTitle="Delete Account"
            handleMainBtn={() => this.handleDeleteAccount()}
            handleCancelBtn={() => this.cancelModal()}
          />
          <SavingModal modalVisible={this.state.saving} /> */}
        </View>
      </ScrollView>
    );
  }
}