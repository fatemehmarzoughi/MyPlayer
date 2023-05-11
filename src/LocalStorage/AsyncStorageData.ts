import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (item: string, value: string) => {
  try {
    await AsyncStorage.setItem("@" + item, value);
  } catch
  (err) { console.log(err); }
};

export const getData = async (item: string) => {
  try {
    return await AsyncStorage.getItem("@" + item);
  } catch
  (err) {
    console.log(err);
    return 0;
  }
};
