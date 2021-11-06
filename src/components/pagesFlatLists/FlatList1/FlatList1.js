import React from "react";
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native'
import { styles } from "./style";

export default class FlatList1 extends React.Component{

    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <View style={styles.row}>
                <Text style={styles.title}>{this.props.title}</Text>
                <FlatList 
                 horizontal
                 data={this.props.data}
                 style={styles.flatlist}
                 keyExtractor={(item , index) => index.toString()}
                 renderItem={({item}) => (
                     <TouchableOpacity onPress={() => this.props.func(item.id)}>
                         <Image style={styles.Image} source={item.imgUrl} />
                     </TouchableOpacity>
                  )}
                />
            </View>
        )
    }
}