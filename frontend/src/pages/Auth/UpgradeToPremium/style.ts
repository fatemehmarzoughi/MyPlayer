import { StyleSheet } from "react-native";
import { gray, mainColor, statusBarIOS, white, width } from "src/assets";

const usedWidth = width - 20;
export const styles = StyleSheet.create({
  subTitle: {
    color: gray,
    textAlign: "center"
  },
  plans: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: usedWidth,
    marginTop: 40
  },
  plan: {
    borderRadius: 10,
    width: usedWidth / 2.5,
    height: usedWidth / 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: gray,
    padding: 5
  },
  planSubTitle: {
    fontSize: 10
  },
  planTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  planTitleText: {
    fontWeight: "normal"
  },
  btn: {
    width: usedWidth,
    backgroundColor: mainColor,
    alignItems: "center",
    padding: 17,
    borderRadius: 10,
    marginTop: 20
  },
  btnText: {
    color: white
  }
});
