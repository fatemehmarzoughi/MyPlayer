import {StyleSheet} from 'react-native';
import {statusBarIOS, width} from 'src/assets';

const usedWidth = width - 30;
export const styles = StyleSheet.create({
  container: {
    width: usedWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  statusBar: {
    marginTop: statusBarIOS,
  },
});
