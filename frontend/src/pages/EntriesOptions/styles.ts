import {StyleSheet} from 'react-native';
import {dark, height, mainColor, white, width} from 'src/assets';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    flex: 1,
    backgroundColor: dark,
    position: 'relative',
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // flex : 1,
    marginTop: 'auto',
    backgroundColor: dark,
  },
  mainBtn: {
    display: 'flex',
    alignItems: 'center',
    width: (2 * width) / 3,
    paddingVertical: 20,
    backgroundColor: mainColor,
    borderRadius: 5,
    margin: 15,
  },
  BtnText: {
    fontWeight: 'bold',
    color: white,
  },
  minorBtn: {
    display: 'flex',
    alignItems: 'center',
    width: (2 * width) / 3,
    paddingVertical: 20,
    borderColor: mainColor,
    borderRadius: 5,

    marginBottom: 15,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  imageStyle: {
    width,
    height: height / 2,
    position: 'absolute',
    top: 20,
    right: 0,
    left: 0,
    zIndex: 22,
  },
});
