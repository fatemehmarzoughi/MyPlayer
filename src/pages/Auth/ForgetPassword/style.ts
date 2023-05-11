import { StyleSheet } from "react-native";
import * as Colors from "~/assets/constants/Colors";
import { statusBarIOS, width } from "~/assets/constants/Units";

const usedWidth = width - 30;
export const styles = StyleSheet.create({
  container: {
    width: usedWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: statusBarIOS
  },
  input: {
    width: usedWidth,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.lightGray,
    marginTop: 20,
    borderRadius: 10
  },
  btn: {
    width: usedWidth,
    backgroundColor: Colors.mainColor,
    alignItems: "center",
    padding: 17,
    borderRadius: 10,
    marginTop: 20
  },
  btnText: {
    color: Colors.white
  }
});
