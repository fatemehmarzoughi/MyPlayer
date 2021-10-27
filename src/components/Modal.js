import React from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { mainColor, white } from "../assets/constants/Colors";
import { width } from "../assets/constants/Units";


export default class ModalClass extends React.Component{

    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        console.log(this.props.modalVisible)
        return(
            <Modal 
            visible={this.props.modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={this.props.cancelModal}
            >
                <View style={styles.modalStyle}>
                   <Text style={styles.textColor}>{this.props.question}</Text>
                   <View style={styles.btns}>
                      <TouchableOpacity style={styles.btnStyle} onPress={this.props.handleMainBtn}>
                          <Text style={styles.textColor}>{this.props.btnTitle}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnStyle} onPress={this.props.handleCancelBtn}>
                          <Text style={styles.textColor}>Cancel</Text>
                      </TouchableOpacity>
                   </View>
                </View>
         </Modal>
        )
    }
}

const usedWidth = width - 20
const styles = StyleSheet.create({
    modalStyle : {
        backgroundColor : mainColor,
        display : 'flex',
        alignItems : 'center',
        justifyContent :'center',
        marginTop : 'auto',
        marginBottom : 'auto',
        marginRight : 'auto',
        marginLeft : 'auto',
        width : usedWidth,
        padding : 30,
        borderRadius : 10,
     },
     btns : {
         display : 'flex',
         alignItems : 'center',
         justifyContent : 'space-around',
         width : usedWidth,
         flexDirection : 'row-reverse',
         marginTop : 30,
     },
     btnStyle : {
         padding : 20,
         paddingRight : 30,
         paddingLeft : 30,
         borderStyle : 'solid',
         borderColor : white,
         borderRadius : 10,
         borderWidth : 1,
     },
     textColor : {
        color : white,
        fontWeight : 'bold'
    }
})