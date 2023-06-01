import {StyleSheet} from 'react-native';
import {gray} from 'src/assets';

export const styles = StyleSheet.create({
  backBtn: {
    textAlign: 'right',
    padding: 10,
    fontSize: 30,
    alignSelf: 'flex-end',
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    paddingTop: 0,
    marginTop: 0,
  },
  title: {
    fontSize: 25,
    margin: 5,
  },
  subTitle: {
    color: gray,
    marginBottom: 20,
  },
  switcherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switcherText: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 15,
  },

  section: {
    padding: 15,
  },
  lines: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  line: {
    height: 0.5,
    backgroundColor: gray,
    width: 110,
  },
  menuItem: {
    padding: 10,
  },
});
