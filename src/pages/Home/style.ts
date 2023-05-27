import { StyleSheet } from "react-native";
import { darkOpacity, lightGray, white, width } from "src/assets";

export const styles = StyleSheet.create({

  bannerImage: {
    width,
    height: 2 * width / 3
  },
  banner: {
  },
  bannerContent: {
    position: "absolute",
    padding: 13,
    width,
    height: 2 * width / 3,
    backgroundColor: darkOpacity
  },
  texts: {
    color: white
  },
  icon: {
    color: white,
    transform: [
      { rotateY: "180deg" }
    ],
    fontSize: 20,
    alignSelf: "flex-start",
    paddingRight: 10
  },
  btn: {
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  categoryName: {
    padding: 20,
    paddingBottom: 5
  },
  dot: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10
  },
  subCategory: {
    padding: 20,
    paddingTop: 10
  },
  selectSubCategory: {
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: lightGray,
    borderRadius: 10
  }

});
