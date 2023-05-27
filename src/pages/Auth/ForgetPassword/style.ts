import {StyleSheet} from 'react-native';
import {lightGray, mainColor, statusBarIOS, white, width} from 'src/assets';

const usedWidth = width - 30;
export const styles = StyleSheet.create({
  container: {
    width: usedWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: statusBarIOS,
  },
  input: {
    width: usedWidth,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: lightGray,
    marginTop: 20,
    borderRadius: 10,
  },
  btn: {
    width: usedWidth,
    backgroundColor: mainColor,
    alignItems: 'center',
    padding: 17,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: white,
  },
});
