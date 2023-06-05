import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from 'src/context';

export type InternalStorageData = {
  accessToken: string | 'GoogleToken';
  isFirstInstallation: boolean;
  appNotification: string;
  theme: Theme;
};

export const storeData = async (
  item: keyof InternalStorageData,
  value: InternalStorageData[typeof item],
) => {
  try {
    await AsyncStorage.setItem('@' + item, String(value));
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (item: keyof InternalStorageData) => {
  try {
    return await AsyncStorage.getItem('@' + item);
  } catch (err) {
    console.log(err);
    return null;
  }
};
