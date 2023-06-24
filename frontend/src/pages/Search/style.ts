import { StyleSheet } from "react-native";
import { width } from "src/assets";

const usedWidth = width - 30;
export const styles = StyleSheet.create({
  input: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    width: usedWidth
  }
});
