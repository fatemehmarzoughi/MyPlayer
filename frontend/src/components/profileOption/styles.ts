import {StyleSheet} from 'react-native';
import {
  dark,
  gray,
} from 'src/assets';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  option: {
    padding: 15,
    borderBottomColor: dark,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  subTitleOptionText: {
    fontSize: 10,
  },
  optionTitleIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  optionTitle: {
    marginLeft: 7,
    color: dark,
  },
  disabledOptionTitle: {
    marginLeft: 7,
    color: gray,
  }
});
