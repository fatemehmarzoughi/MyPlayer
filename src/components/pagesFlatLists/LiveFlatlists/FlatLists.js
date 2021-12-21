import React from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text as NativeText } from 'native-base'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colors from '/assets/constants/Colors'

export default class FlatLists extends React.Component{

    constructor(){
        super();
        this.state = {
            unstar : 'flex',
            star : 'none',
        }
    }

    stared = () => {
        // change the stared properti in data to true or false
    }

    render(){
        return(
            <View style={styles.container}>
              <NativeText bold={true} fontSize="lg" marginBottom={5}>{this.props.title}</NativeText>
              <FlatList
               horizontal
               data={this.props.data}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => (
                   <View style={styles.imageContainer}>
                      <FastImage
                       style={styles.image}
                       alt="TV"
                       source={{
                           uri : item.uri,
                           priority : FastImage.priority.normal
                       }}
                       resizeMode={FastImage.resizeMode.cover}
                      />
                      <TouchableOpacity style={styles.icons} onPress={() => this.stared()}>
                      <>
                      {item.stared ? (
                        <Icon 
                           name="star" 
                           size={25} 
                           color={Colors.white} 
                        />
                      ) : (
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        margin : 25
    },
    image : {
        margin : 10,
        marginLeft : 0,
        width : 300, 
        height : 200,
        borderRadius : 20
    },
    imageContainer : {
        position : 'relative'
    },
    icons : {
        backgroundColor : Colors.dark,
        position : 'absolute',
        bottom : 20,
        right : 20,
        borderRadius : 14,
        padding : 5,
    },
    icon : {
        position : "absolute",
        bottom : 5,
        right : 5
    }
})