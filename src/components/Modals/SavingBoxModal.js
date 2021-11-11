import React from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { height, width } from '../../assets/constants/Units';
import { mainColor, white, dark } from '../../assets/constants/Colors';

export default class SavingModal extends React.Component{

    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
                <Modal 
                visible={this.props.modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={this.props.cancelModal}
                >
                    <View style={styles.container}>
                        <View style={styles.modalStyle}>
                            <LottieView loop={true} autoPlay={true} source={require('../../assets/Images/loading.json')} />
                            <Text style={styles.text}>Saving</Text>
                        </View>
                    </View>
                 </Modal>
        )
    }
}

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
        width : 150,
        height : 150,
        padding : 30,
        borderRadius : 10,
        borderColor : mainColor,
        borderStyle : 'solid',
        borderWidth : 5,
     },
     text : {
         color : white
     },
     container : {
         backgroundColor : 'rgba(0,0,0,0.6)',
         height : height,
         width : width
     }
})