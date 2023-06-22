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
  PageWrapper,
  SavingModal,
  contentColor,
  surfaceColor,
} from 'src/components';
import React from 'react';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';
import {NavigationProp} from '@react-navigation/native';
import Context from 'src/context/context';
import {
  DELETE,
  UserUpdatedRequestBody,
  deleteAccount,
  updateUser,
} from 'src/API';
import {storeData} from 'src/LocalStorage';
import {dark, gray, toastMessageDuration, white} from 'src/assets';

import {styles} from './style';

export interface IEditProfileProps {
  navigation: NavigationProp<any, any>;
}
export interface IEditProfileState {
  name?: string;
  email?: string;
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
      name: undefined,
      email: undefined,
      saving: false,
    };
  }

  handleDeleteAccount = async () => {
    await deleteAccount({
      onSuccess: async data => {
        await storeData('accessToken', null);
        await storeData('userId', null);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Account deleted successfully',
          text2: '',
          topOffset: 30,
          bottomOffset: 40,
          visibilityTime: toastMessageDuration,
          autoHide: true,
        });
        /* ------ DO NOT CHANGE THE POSITION OF THIS CODE (THE APP WILL CRASH) ------ */
        this.setState({
          modalVisible: false,
        });
        this.context.setIsLogin(false);
        /* ---------------------------------- ***** --------------------------------- */
      },
      onError: err => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Something went wrong',
          text2: 'Please try again',
          topOffset: 30,
          bottomOffset: 40,
          visibilityTime: toastMessageDuration,
          autoHide: true,
        });
      },
    });
  };

  onSave = async () => {
    this.setState({
      saving: true,
    });

    const reqBody = (): UserUpdatedRequestBody => {
      switch (true) {
        case !!this.state.email && !!this.state.name:
          return {
            email: this.state.email,
            username: this.state.name,
          };

        case !!this.state.email:
          return {
            email: this.state.email,
          };

        case !!this.state.name:
          return {
            username: this.state.name,
          };
        default:
          return {};
      }
    };

    updateUser({
      reqBody: reqBody(),
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
        <PageWrapper>
          <View style={styles.header}>
            <View style={styles.row1}>
              <TouchableOpacity onPress={this.onSave} style={styles.btn}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
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
              placeholderTextColor={
                this.context.theme === 'light' ? dark : gray
              }
              style={[
                styles.input,
                surfaceColor(this.context.theme),
                contentColor(this.context.theme),
              ]}
              onChangeText={name =>
                this.setState({
                  name,
                })
              }
            />
            <TextInput
              placeholder={this.context.userInfo?.email}
              placeholderTextColor={
                this.context.theme === 'light' ? dark : gray
              }
              style={[
                styles.input,
                surfaceColor(this.context.theme),
                contentColor(this.context.theme),
              ]}
              onChangeText={email =>
                this.setState({
                  email,
                })
              }
            />
            <TouchableOpacity
              style={[styles.input, surfaceColor(this.context.theme)]}
              onPress={() => this.setState({countrySelectorVisibility: true})}>
              <CountryPicker
                theme={{
                  primaryColor: this.context.theme === 'light' ? dark : white,
                  onBackgroundTextColor:
                    this.context.theme === 'light' ? dark : white,
                  backgroundColor: this.context.theme === 'dark' ? dark : white,
                  primaryColorVariant:
                    this.context.theme === 'light' ? dark : white,
                }}
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
            style={[styles.deleteBtn, surfaceColor(this.context.theme)]}>
            <Text style={[styles.deleteBtnText]}>Delete Account</Text>
          </TouchableOpacity>
          <SavingModal modalVisible={this.state.saving} />
          <ModalClass
            question="Are you sure, you want to delete your account?"
            modalVisible={this.state.modalVisible}
            btnTitle="Delete Account"
            handleMainBtn={this.handleDeleteAccount}
            handleCancelBtn={() =>
              this.setState({
                modalVisible: false,
              })
            }
          />
        </PageWrapper>
      </ScrollView>
    );
  }
}
