import React from "react";
import FastImage from "react-native-fast-image";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { styles } from "./style";

export interface IHomeFlatListsStates {}
export interface IHomeFlatListsProps {
  title: string;
  type: "large" | "medium" | "small";
  data: { url: string }[];
}

export class HomeFlatLists extends React.Component<
  IHomeFlatListsProps,
  IHomeFlatListsStates
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
