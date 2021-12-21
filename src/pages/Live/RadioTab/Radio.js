import React from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text as NativeText } from 'native-base'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Colors from '/assets/constants/Colors'
import FlatLists from '/components/pagesFlatLists/LiveFlatlists/FlatLists'

export default class Radio extends React.Component{

    constructor(){
        super();

        this.state = {
            data : [
                { 
                    id : 0,
                    uri : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
                    stared : true
                },
                { 
                    id : 1,
                    uri : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
                    stared : false
                },
                { 
                    id : 2,
                    uri : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
                    stared : false
                },
                { 
                    id : 3,
                    uri : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
                    stared : false
                },
                { 
                    id : 4,
                    uri : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
                    stared : false
                },
            ]
        }
    }

    render(){
        return(
            <ScrollView>
                <View>
                    <FlatLists 
                      data={this.state.data}
                      title="Most Watched"
                    />
                    <FlatLists 
                      data={this.state.data}
                      title="All"
                    />
                    <FlatLists 
                      data={this.state.data}
                      title="News"
                    />
                </View>
            </ScrollView>
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
    icon : {
        backgroundColor : Colors.dark,
        position : 'absolute',
        bottom : 20,
        right : 20,
        borderRadius : 14,
        padding : 5,
    }
})