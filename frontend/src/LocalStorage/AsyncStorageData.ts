import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from 'src/context';

export type InternalStorageData = {
  accessToken: string | 'GoogleToken' | null;
  isFirstInstallation: false | null; // null => true, false => false
  appNotification: string;
  theme: Theme;
  userId: number | null;
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
