import {StyleSheet} from 'react-native';
import {lightGray, statusBarIOS, width} from 'src/assets';

const usedWidth = width - 20;
export const styles = StyleSheet.create({
  input: {
    width: usedWidth,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: lightGray,
    // marginBottom : 5,
    marginTop: 20,
    borderRadius: 10,
  },
});
