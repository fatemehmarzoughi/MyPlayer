import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./style";
import FastImage from "react-native-fast-image";

export interface IFlatListsStates {}
export interface IFlatListsProps {
  title: string;
  type: "large" | "medium" | "small";
  data: { url: string }[];
}

export default class FlatLists extends React.Component<
  IFlatListsProps,
  IFlatListsStates
> {
  override render() {
    return (
      <View style={styles.container}>
        <Text style={styles.rowTitle}>{this.props.title}</Text>
        <FlatList
          horizontal
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            // <TouchableOpacity onPress={() => this.props.onPress(item.id)}>
            <TouchableOpacity>
              <FastImage
                style={[
                  styles.item,
                  this.props.type === "large"
                    ? styles.itemLarge
                    : this.props.type === "medium"
                    ? styles.itemMid
                    : styles.itemSmall,
                ]}
                source={{
                  uri: item.url,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
