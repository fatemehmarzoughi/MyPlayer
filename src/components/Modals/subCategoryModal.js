import React from 'react';
import { 
    Modal ,
    StyleSheet,
    View , 
    Text, 
    TouchableOpacity, 
    FlatList, 
    ScrollView, 
    Dimensions, 
    Image, 
    Animated,
} from 'react-native';
import * as Colors from 'assets/constants/Colors';
import {statusBarIOS } from 'assets/constants/Units'
import { width, height } from 'assets/constants/Units';
import { FocusScrollView } from 'react-native-focus-scroll';
import Icon from 'react-native-vector-icons/Ionicons';


const AnimatedValues = {
    fontSize1 : 40,
    fontSize2 : 30,
    fontSize3 : 20,
}

export default class SubCategoryModal extends React.Component{
    constructor(){
        super();
        this.state = { 
            itemFocus : 6,
            itemClose1 : 0,
            itemClose2 : 0,
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 120
        }
    }

    scroller = (name) => {
        this.props.selectedSbCategory(name)
    }

    onViewableItemsChanged = (ViewTokens) => {
        const length = Math.round(ViewTokens.viewableItems.length);
        this.setState({
            itemFocus : ViewTokens.viewableItems[1].index,
            itemClose1 : ViewTokens.viewableItems[0].index,
            itemClose2 : ViewTokens.viewableItems[2].index,
        })
    }

    textType = (index) => {
        if(this.state.itemFocus === index) return 'focusedText'
        else if(this.state.itemClose1 === index) return 'closeText';
        else if(this.state.itemClose2 === index) return 'closeText';
    }


    render(){

        let viewabilityConfig = {
          waitForInteraction: true,
          viewAreaCoveragePercentThreshold: 90,
          itemVisiblePercentThreshold: 120
        }

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
                    <FlatList
                        initialScrollIndex={5}
                        viewabilityConfig={{
                          waitForInteraction: true,
                          viewAreaCoveragePercentThreshold: 0,
                          viewAreaCoveragePercentThreshold: 120,
                        }}
                        getItemLayout={(data, index) => (
                          {length: 120, offset: 120 * index, index}
                        )}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        data={data}
                        keyExtractor={(item , index) => index.toString()}
                        renderItem={({item, index}) => (
                            <>
                            <TouchableOpacity key={index} onPress={() => this.scroller(item.name)} style={styles.item}>
                              <Text 
                                style={[styles.text , styles[this.textType(index)]]} 
                                key={index}
                              >
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                            </>
                        )}
                    />
                    <TouchableOpacity onPress={() => this.props.closeModal()} style={styles.closeBtn}>
                       <Icon name="close-outline" color={Colors.dark} size={40} />
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    focusedText : {
        color : Colors.white,
        fontSize : AnimatedValues.fontSize1,
        
    },
    closeText : {
        color : Colors.gray,
        fontSize : AnimatedValues.fontSize2,
    },

    container: {
        top: 20,
        backgroundColor : Colors.darkOpacity2,
        // backgroundColor : '#000000e0',
        flex : 1,
    },
    square: {
        width: width,
        // height: dim.width,
    },

    text: {
        color: "gray",
        // fontSize: AnimatedValues.fontSize3,
        fontWeight: "bold",
        alignContent: "center",
        alignSelf: "center",
        width : width,
        textAlign : 'center',
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
        height : 120,
        width : width,
        justifyContent : 'center'
    },

    closeBtn : {
        backgroundColor : Colors.white,
        padding : 10,
        borderRadius : 60,
        position : 'absolute',
        bottom : 40,
        left : width / 2 - 25,
    }
})
