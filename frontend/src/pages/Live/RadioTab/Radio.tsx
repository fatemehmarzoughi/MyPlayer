import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { dark } from "src/assets";
import { FlatLists, ITVDataType } from "src/components";

export interface IRadioProps {}

export interface IRadioStates {
  data: ITVDataType[];
}
export class Radio extends React.PureComponent<IRadioProps, IRadioStates> {
  constructor(props: IRadioProps) {
    super(props);

    this.state = {
      data: [
        {
          id: 0,
          uri: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg",
          stared: true,
        },
        {
          id: 1,
          uri: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg",
          stared: false,
        },
        {
          id: 2,
          uri: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg",
          stared: false,
        },
        {
          id: 3,
          uri: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg",
          stared: false,
        },
        {
          id: 4,
          uri: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg",
          stared: false,
        },
      ],
    };
  }

  override render() {
    return (
      <ScrollView>
        <View>
          <FlatLists data={this.state.data} title="Most Watched" />
          <FlatLists data={this.state.data} title="All" />
          <FlatLists data={this.state.data} title="News" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  image: {
    margin: 10,
    marginLeft: 0,
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  imageContainer: {
    position: "relative",
  },
  icon: {
    backgroundColor: dark,
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 14,
    padding: 5,
  },
});
