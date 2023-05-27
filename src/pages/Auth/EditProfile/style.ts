import { StyleSheet } from "react-native";
import * as Colors from "@/assets/constants/Colors";
import { statusBarIOS, width, titleFontSize } from "@/assets/constants/Units";

const usedWidth = width - 20;
export const styles = StyleSheet.create({
  container: {
    marginTop: statusBarIOS,
    width: usedWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "auto",
    marginLeft: "auto"
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: Colors.lightGray
  },
  changePhoto: {
    margin: 15,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    width: usedWidth - 20,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  inputs: {
    marginTop: 20
  },
  deleteBtn: {
    padding: 20,
    backgroundColor: Colors.lightGray,
    margin: 80,
    width: usedWidth - 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  deleteBtnText: {
    color: Colors.mainColor,
    fontWeight: "bold"
  },

  header: {
    width: usedWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  row1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: usedWidth,
    flexDirection: "row-reverse"
  },
  saveText: {
    color: Colors.mainColor,
    fontWeight: "bold",
    fontSize: 18
  },
  cancelText: {
    fontSize: 18
  },
  btn: {
    padding: 20
  },
  title: {
    fontSize: titleFontSize
  }
});
