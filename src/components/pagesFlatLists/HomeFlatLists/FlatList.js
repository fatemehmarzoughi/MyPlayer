import React from 'react';
import {
    View, 
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {styles} from './style';

export default class FlatLists extends React.Component {

    constructor(){
        super();

    }

    render(){
        return(
            <View style={styles.container}>
                <Text fontSize="lg" style={styles.rowTitle}>{this.props.title}</Text>
                <FlatList
                 horizontal
                 data={this.props.data}
                 style={styles.items}
                 keyExtractor={(item , index) => index.toString()}
                 renderItem={({item}) => (
                    <TouchableOpacity onPress={() => this.props.onPress(item.id)}>
                       <Image alt="images" style={[ styles.item ,
                            (this.props.type === 'large') ? styles.itemLarge :
                            (this.props.type === 'medium') ? styles.itemMid : 
                            styles.itemSmall
                        ]} 
                        source={{uri : item.largImageUrl}}
                        />
                    </TouchableOpacity>
                 )}
                />
            </View>
        )
    }
}