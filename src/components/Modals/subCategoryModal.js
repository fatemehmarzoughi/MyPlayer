import React from 'react';
import { Modal , StyleSheet, View , Text, TouchableOpacity, FlatList} from 'react-native';
import * as Colors from 'assets/constants/Colors';
import {statusBarIOS} from 'assets/constants/Units'
import { width } from 'assets/constants/Units';


export default class SubCategoryModal extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            // <AnimatedComponent entering={FadeIn}>
            <Modal
             visible ={this.props.subCategoryVisibility}
             animationType="slide"
             transparent={true}
             style={styles.subCategoryModal}
            >
                <View style={styles.flatlist}>
                    <FlatList
                      data={this.props.data[this.props.selectedCategory].subCategory}
                      keyExtractor={(item , index) => index.toString()}
                      renderItem = {({item}) => (
                          <TouchableOpacity onPress={() => this.props.selectedSbCategory(item.name)}>
                              <Text style={styles.item}>{item.name}</Text>
                          </TouchableOpacity>
                      )}
                     />
                </View>
            </Modal>
            // </AnimatedComponent>
        )
    }
}

const styles = StyleSheet.create({

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
        padding : 25,
        fontSize : 20,
        textAlign : 'center',
        borderStyle : 'solid',
        borderBottomColor : Colors.white,
        borderBottomWidth : 1,
        width : width
    }
})
