import {StyleSheet} from 'react-native';
import {mainColor, statusBarIOS, white, width} from 'src/assets';

const usedWidth = width - 20;
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
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: mainColor,
    padding: 12,
    paddingBottom: 100,
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
