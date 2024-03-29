import { StyleSheet } from "react-native";
import { gray } from "src/assets";

export const styles = StyleSheet.create({
  container: {
    // marginTop : 10,
    marginBottom: 40
  },
  item: {
    width: 150,
    height: 200,
    borderRadius: 20,
    marginLeft: 20,
    backgroundColor: gray
  },
  itemLarge: {
    width: 250,
    height: 300
  },
  itemMid: {
    width: 150,
    height: 200
  },
  itemSmall: {
    width: 150,
    height: 150
  },
  rowTitle: {
    fontWeight: "bold",
    margin: 20
  }
});
