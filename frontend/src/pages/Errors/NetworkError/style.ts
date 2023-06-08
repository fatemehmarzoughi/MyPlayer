import {StyleSheet} from 'react-native';
import {mainColor, titleFontSize, white, width} from 'src/assets';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: titleFontSize,
  },
  mainBtn: {
    display: 'flex',
    alignItems: 'center',
    width: (2 * width) / 6,
    paddingVertical: 15,
    backgroundColor: mainColor,
    borderRadius: 5,
    margin: 15,
  },
  BtnText: {
    fontWeight: 'bold',
    color: white,
  },
});
