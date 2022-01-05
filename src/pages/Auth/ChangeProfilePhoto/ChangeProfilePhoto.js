import React from "react";
import { 
    View, 
    ScrollView, 
    RefreshControl, 
    TouchableOpacity,
    Text 
} from "react-native";
import Header  from "components/pagesHeader/Header";
import { styles } from "./style";
import FlatList1 from "components/pagesFlatLists/FlatList1/FlatList1";
import {GET_noToken} from 'API/index'
import Context from "context/context";
import Icon from "react-native-vector-icons/EvilIcons";
import * as Colors from "assets/constants/Colors";
import {changeColor} from 'components/lightDarkTheme'
import { width } from "assets/constants/Units";

export default class ChangeProfilePhoto extends React.PureComponent{

    static contextType = Context

    constructor(){
        super();
        this.state={
            Animation : [],
            Artists : [],
            Actors : [],
            refreshing : false,
        }
    }

    getImages = async () => {
        try{
            const resultAnimation = await GET_noToken('/images/imageLists/Animation');
            const Animation = await resultAnimation.json();

            const resultArtists = await GET_noToken('/images/imageLists/Artists');
            const Artists = await resultArtists.json();

            const resultActors = await GET_noToken('/images/imageLists/Actors');
            const Actors = await resultActors.json();

            this.setState({
                Animation,
                Artists,
                Actors,
                refreshing : false
            })
        }
        catch(err){
            console.log(err)
        }
    }

    async componentDidMount(){
        await this.getImages()
    }

    onPress = (imageURL) => {
        console.log('imageURL  == ' + imageURL)
        this.context.setUserImage(imageURL)
        this.props.navigation.navigate('EditProfile')
    }

    render(){
        return(
            <ScrollView
            refreshControl = {
                <RefreshControl
                 onRefresh={() => this.getImages()}
                 refreshing = {this.state.refreshing}
                />
            }
            >
                <View style={styles.container}>
                    <View style={[styles.header ]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')} style={styles.iconBack}>
                           <Icon name="chevron-left" size={40} color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={[styles.titleHeader , changeColor(this.context.theme)]}>Choose a Photo</Text>
                    </View>  
                   {/* <Header 
                     title="Choose a Photo" 
                     customClick={() => this.props.navigation.navigate('EditProfile')} 
                     theme={this.context.theme}
                    /> */}
                   <>
                   {(this.state.Animation.length == 0 || this.state.Actors.length == 0 || this.state.Artists.length == 0) ? (
                       <View>
                           <FlatList1 
                              data={this.state.Animation} 
                              title="Animation" 
                              func={() => {}} 
                              loading={true}
                              theme={this.context.theme}
                           />
            
                           <FlatList1 
                              data={this.state.Artists} 
                              title="Artists" 
                              func={() => {}} 
                              loading={true}
                              theme={this.context.theme}
                           />
            
                           <FlatList1 
                              data={this.state.Actors} 
                              title="Actors" 
                              func={() => {}} 
                              loading={true}
                              theme={this.context.theme}
                           />
                       </View>
                   ) : (
                       <View>
                           <FlatList1 
                              data={this.state.Animation} 
                              title="Animation" 
                              func={(imageURL) => this.onPress(imageURL)} 
                              theme={this.context.theme}
                           />
            
                           <FlatList1 
                              data={this.state.Artists} 
                              title="Artists" 
                              func={(imageURL) => this.onPress(imageURL)} 
                              theme={this.context.theme}
                           />
            
                           <FlatList1 
                              data={this.state.Actors} 
                              title="Actors" 
                              func={(imageURL) => this.onPress(imageURL)} 
                              theme={this.context.theme}
                           />
                       </View>
                   )}
                   </>
                </View>


                
            </ScrollView>
        )
    }
}
