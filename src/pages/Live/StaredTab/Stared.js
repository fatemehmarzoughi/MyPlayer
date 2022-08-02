import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import * as Colors from "assets/constants/Colors";

export default class Stared extends React.Component {
  constructor () {
    super();
    this.state = {
      data: [
        {
          id: 0,
          uri: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg",
          stared: true
        },
        {
          id: 1,
          uri: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/4115/jpeg",
          stared: true
        }
      ]
    };
  }

  stared = () => {
    // change the stared properti in data to true or false
  };

  render () {
    return (
            <FlatList
            style={styles.container}
               data={this.state.data}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => (
                   <View style={styles.imageContainer}>
                      <FastImage
                       style={styles.image}
                       alt="TV"
                       source={{
                         uri: item.uri,
                         priority: FastImage.priority.normal
                       }}
                       resizeMode={FastImage.resizeMode.cover}
                      />
                      <TouchableOpacity style={styles.icons} onPress={() => this.stared()}>
                      <>
                      {item.stared
                        ? (
                        <Icon
                           name="star"
                           size={25}
                           color={Colors.white}
                        />
                          )
                        : (
                        <Icon
                           name="star-outline"
                           size={25}
                           color={Colors.white}
                        />
                          )}
                      </>
                      </TouchableOpacity>
                    </View>
               )}
            />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 25
  },
  image: {
    margin: 10,
    width: 300,
    height: 200,
    borderRadius: 20
  },
  imageContainer: {
    position: "relative",
    alignSelf: "center"
  },
  icons: {
    backgroundColor: Colors.dark,
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 14,
    padding: 5
  },
  icon: {
    position: "absolute",
    bottom: 5,
    right: 5
  }
});
