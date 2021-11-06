import React from "react";
import { Text, View, ScrollView, FlatList, Image } from "react-native";
import Header  from "../../../components/pagesHeader/Header";
import { styles } from "./style";
import FlatList1 from "../../../components/pagesFlatLists/FlatList1/FlatList1";

export default class ChangeProfilePhoto extends React.Component{

    constructor(){
        super();
        this.state={
            animationsPhoto : [
                {
                    id : 1,
                    imgUrl : require('../../../assets/Images/Windows-11.jpeg'),
                },
                {
                    id : 2,
                    imgUrl : require('../../../assets/Images/Windows-11.jpeg'),
                },
                {
                    id : 3,
                    imgUrl : require('../../../assets/Images/Windows-11.jpeg'),
                }
            ]
        }
    }

    onPress = (id) => {
        console.log('id  == ' + id)
        this.props.navigation.navigate('EditProfile')
    }

    render(){
        return(
            <ScrollView>
               <View style={styles.container}>
                  <Header title="Choose a Photo" customClick={() => this.props.navigation.navigate('EditProfile')} />
                  <FlatList1 
                     data={this.state.animationsPhoto} 
                     title="Animation" func={(id) => this.onPress(id)} 
                  />

                  <FlatList1 
                     data={this.state.animationsPhoto} 
                     title="Artists" func={(id) => this.onPress(id)} 
                  />

                  <FlatList1 
                     data={this.state.animationsPhoto} 
                     title="Actors" func={(id) => this.onPress(id)} 
                  />
               </View>
            </ScrollView>
        )
    }
}
