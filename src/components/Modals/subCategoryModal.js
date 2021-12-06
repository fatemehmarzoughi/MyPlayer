import React from 'react';
import { Modal , StyleSheet, View , Text, TouchableOpacity, FlatList, ScrollView, Dimensions, Image} from 'react-native';
import * as Colors from 'assets/constants/Colors';
import {statusBarIOS } from 'assets/constants/Units'
import { width, height } from 'assets/constants/Units';
import { FocusScrollView } from 'react-native-focus-scroll';

const dim = Dimensions.get("screen")

class BeerComponent extends React.Component {
    render() {

        return (
            <View style={{paddingTop : 50}} onLayout={this.props.onLayout} >
            {(this.props.name === '') ? 
               <Text onPress={() => this.props.selectedSbCategory('saba')} style={styles.text}></Text>
             :
               <Text 
               style={[styles.text , this.props.isFocused ? {color : Colors.white, fontSize : 42} : {color : Colors.gray, fontSize : 30}]} 
               onPress={() => this.props.selectedSbCategory(this.props.name)} 
               >
                  {this.props.name}
               </Text>
             }
            </View>

        )
    }
}


export default class SubCategoryModal extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }


    render(){
        let style;
        let beers = [
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: "KILKENNY"},
            {name: "GUINESS"},
            {name: "YAMATANO-OROCHI"},
            {name: "PAULANER"},
            {name: "KILKENNY"},
            {name: "GUINESS"},
            {name: "YAMATANO-OROCHI"},
            {name: "PAULANER"},
            {name: "KILKENNY"},
            {name: "GUINESS"},
            {name: "YAMATANO-OROCHI"},
            {name: "PAULANER"},
            {name: "KILKENNY"},
            {name: "GUINESS"},
            {name: "YAMATANO-OROCHI"},
            {name: "PAULANER"},
            {name: "KILKENNY"},
            {name: "GUINESS"},
            {name: "YAMATANO-OROCHI"},
            {name: "PAULANER"},
            {name: "KILKENNY"},
            {name: "GUINESS"},
            {name: "YAMATANO-OROCHI"},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
        ];

        let extraData = [
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
            {name: ""},
        ]

        let data = extraData.concat(this.props.data)
        data = data.concat(extraData)
        return(
            <Modal
             visible ={this.props.subCategoryVisibility}
             animationType="slide"
             transparent={true}
             style={styles.subCategoryModal}
            >
                <View style={styles.container}>
                    <FocusScrollView style={styles.scroll} threshold={50}>
                        {data.map((beer, index) => <BeerComponent selectedSbCategory={this.props.selectedSbCategory} key={index} name={beer.name} />)}
                    </FocusScrollView>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: 20,
        backgroundColor : Colors.dark,
        flex : 1,
    },
    square: {
        width: dim.width,
        height: dim.width,
    },

    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        alignContent: "center",
        alignSelf: "center",
    },
    scroll : {
    },


    subCategoryModal : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },
    flatlist : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : Colors.dark,
        paddingTop : statusBarIOS,
        
    },
    item : {
        color : Colors.white,
        padding : 55,
        fontSize : 20,
        textAlign : 'center',
        borderStyle : 'solid',
        borderBottomColor : Colors.white,
        borderBottomWidth : 1,
        width : width
    },
})
