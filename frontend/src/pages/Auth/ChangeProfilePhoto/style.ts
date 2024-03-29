import {StyleSheet} from 'react-native';
import {mainColor, width} from 'src/assets';

const usedWidth = width - 20;
export const styles = StyleSheet.create({
  row: {
    width: usedWidth,
    marginTop: 20,
  },
  flatlist: {
    marginTop: 20,
  },
  Image: {
    width: 150,
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 16,
    width: usedWidth,
    paddingLeft: 10,
  },

  header: {
    marginBottom: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: usedWidth,
    flexDirection: 'row',
    // margin : 10,
  },
  iconBack: {
    backgroundColor: mainColor,
    borderRadius: 15,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
  },
  titleHeader: {
    fontWeight: 'bold',
    marginRight: 'auto',
    marginLeft: 'auto',
    alignSelf: 'flex-start',
  },
});
