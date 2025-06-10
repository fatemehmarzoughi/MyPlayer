import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker, {
  TranslationLanguageCodeList,
  TranslationLanguageCodeMap,
} from 'react-native-country-picker-modal';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';
import {deleteAccount, updateUser, UserUpdatedRequestBody} from 'src/API';
import {dark, gray, toastMessageDuration, white} from 'src/assets';
import {
  contentColor,
  ModalClass,
  PageWrapper,
  SavingModal,
  surfaceColor,
} from 'src/components';
import Context from 'src/context/context';
import {storeData} from 'src/LocalStorage';

import {styles} from './style';

interface EditProfileProps {
  navigation: NavigationProp<any, any>;
}

export const EditProfile = React.memo<EditProfileProps>(({navigation}) => {
  const context = useContext(Context);

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countrySelectorVisibility, setCountrySelectorVisibility] =
    useState(false);
  const [choosedCountry, setChoosedCountry] = useState<
    string | TranslationLanguageCodeMap
  >(TranslationLanguageCodeList[0]);
  const [countryCode, setCountryCode] = useState<
    string | TranslationLanguageCodeMap
  >();
  const [countryFlag, setCountryFlag] = useState<string>();

  const reqBody = useMemo((): UserUpdatedRequestBody => {
    if (email && name) return {email, username: name};
    if (email) return {email};
    if (name) return {username: name};
    return {};
  }, [email, name]);

  const handleDeleteAccount = useCallback(async () => {
    await deleteAccount({
      onSuccess: async () => {
        await storeData('accessToken', null);
        await storeData('userId', null);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Account deleted successfully',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        setModalVisible(false);
        context.setIsLogin(false);
      },
      onError: () => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Something went wrong',
          text2: 'Please try again',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
      },
    });
  }, [context]);

  const onSave = useCallback(async () => {
    setSaving(true);
    updateUser({
      reqBody,
      onSuccess: () => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Saved changes',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        setSaving(false);
        navigation.navigate('Profile');
      },
      onError: err => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: String(err),
          text2: 'Please try again later',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        setSaving(false);
      },
    });
  }, [reqBody, navigation]);

  return (
    <ScrollView>
      <PageWrapper>
        <View style={styles.header}>
          <View style={styles.row1}>
            <TouchableOpacity onPress={onSave} style={styles.btn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btn}>
              <Text style={[styles.cancelText, contentColor(context.theme)]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.title, contentColor(context.theme)]}>Edit Profile</Text>
          </View>
        </View>

        <Image style={styles.image} source={{uri: context.userInfo?.avatar}} />
        <Text
          onPress={() => navigation.navigate('ChangeProfilePhoto')}
          style={[styles.changePhoto, contentColor(context.theme)]}>
          Change Profile Photo
        </Text>
        <View style={styles.inputs}>
          <TextInput
            placeholder={context.userInfo?.username}
            placeholderTextColor={context.theme === 'light' ? dark : gray}
            style={[
              styles.input,
              surfaceColor(context.theme),
              contentColor(context.theme),
            ]}
            onChangeText={setName}
          />
          <TextInput
            placeholder={context.userInfo?.email}
            placeholderTextColor={context.theme === 'light' ? dark : gray}
            style={[
              styles.input,
              surfaceColor(context.theme),
              contentColor(context.theme),
            ]}
            onChangeText={setEmail}
          />
          <TouchableOpacity
            style={[styles.input, surfaceColor(context.theme)]}
            onPress={() => setCountrySelectorVisibility(true)}>
            <CountryPicker
              theme={{
                primaryColor: context.theme === 'light' ? dark : white,
                onBackgroundTextColor: context.theme === 'light' ? dark : white,
                backgroundColor: context.theme === 'dark' ? dark : white,
                primaryColorVariant: context.theme === 'light' ? dark : white,
              }}
              preferredCountries={['US', 'IR']}
              withFilter
              withCountryNameButton
              withFlag
              withEmoji
              onSelect={val => {
                setCountryCode(val.name);
                setChoosedCountry(val.name);
                setCountryFlag(val.flag);
              }}
              onClose={() => setCountrySelectorVisibility(false)}
              visible={countrySelectorVisibility}
              countryCode="AF"
            />
            <Icon name="chevron-down" size={40} color={gray} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.deleteBtn, surfaceColor(context.theme)]}>
          <Text style={styles.deleteBtnText}>Delete Account</Text>
        </TouchableOpacity>

        <SavingModal modalVisible={saving} />
        <ModalClass
          question="Are you sure, you want to delete your account?"
          modalVisible={modalVisible}
          btnTitle="Delete Account"
          handleMainBtn={handleDeleteAccount}
          handleCancelBtn={() => setModalVisible(false)}
        />
      </PageWrapper>
    </ScrollView>
  );
});
