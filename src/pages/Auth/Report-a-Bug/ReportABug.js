import React from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/EvilIcons";
import { mainColor, white } from "../../../assets/constants/Colors";
import { styles } from "./style";
import Header from "../../../components/pagesHeader/Header";

export default class ReportABug extends React.Component{

    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Header title="Report a Bug" customClick={() => this.props.navigation.navigate('Profile')}/>
                    <TextInput
                    placeholder = "Your explenation goes here ... "
                    style={styles.input}
                    />
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Report</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}