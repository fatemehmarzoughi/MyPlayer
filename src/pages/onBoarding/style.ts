import { StyleSheet } from "react-native";
import { height, mainColor, white, width } from "src/assets";

export const styles = StyleSheet.create({
  container: {
    // marginTop : statusBar,
    flex: 1,
    backgroundColor: "#333",
    width
  },
  containerIsRotate: {
    width: height,
    flex: 1,
    backgroundColor: "#333"
  },
  GestureRecognizerStyle: {
    // width : width,
    flex: 7,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  Allpages: {
    width: 4 * width,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },
  AllpagesIsRotate: {
    width: 4 * height,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },
  pageStyle: {
    marginTop: 20,
    width
  },
  pageStyleIsRotate: {
    // marginTop : 20,
    width: height
  },
  content: {
    // margin : 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  contentText: {
    color: white,
    margin: 20,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 35
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 100,
    marginRight: "auto",
    marginLeft: "auto"
  },
  ImageIsRotate: {
    width: 100,
    height: 100,
    marginBottom: 100,
    marginRight: "auto",
    marginLeft: "auto"
  },
  bottomBarStyle: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    marginRight: 10,
    marginLeft: 10,
    zIndex: 30
  },
  nextBtn: {
    backgroundColor: mainColor,
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    color: white
  },
  skipBtn: {
    borderColor: mainColor,
    borderWidth: 1,
    borderStyle: "solid",
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    color: mainColor
  },
  dots: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  dot: {
    // backgroundColor : mainColor,
    width: 7,
    height: 7,
    borderRadius: 50,
    margin: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: mainColor
  }
});
