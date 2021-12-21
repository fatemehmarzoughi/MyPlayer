import React from 'react';
import { 
    Text,
    View,
} from 'react-native';
import FlatLists from 'components/pagesFlatLists/HomeFlatLists/FlatList';
import LottieView from 'lottie-react-native';
import { VStack } from 'native-base'

export default class Categories extends React.Component{
    constructor(){
        super();
        this.state = {
            fakeData : [
                {
                    largImageUrl : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/42314/jpg'
                },
                {
                    largImageUrl : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/42314/jpg'
                },
                {
                    largImageUrl : 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/42314/jpg'
                },
            ]
        }
    }

    componentDidMount(){
        console.log('categories is rendering');
    }

    shouldComponentUpdate(){
        return true
    }

    render(){
        // this.props.refreshing ? {} : {}

        return(

            <>
            {this.props.refreshing ? (
                <LottieView 
                  loop={true} 
                  autoPlay={true} 
                  source={require('../../assets/Images/loading.json')} 
                  size={10}
                  style={{ width : 50, height : 50, marginLeft : 'auto', marginRight : 'auto' }}
                />
            ) : (
            <View>
                {/* <FlatLists 
                 title="My Playlist" 
                 data = {this.state.falstListData}
                 type = "small"
                 onPress={(id) => console.log(id)}
                /> */}

                <FlatLists 
                 title="Recommended" 
                 data = {this.props.recommended}
                 type = "medium"
                //  onPress={(id) => console.log(id)}
                />

                <FlatLists 
                 title="Most Watched" 
                 data = {this.props.mostWatched}
                 type = "medium"
                //  onPress={(id) => console.log(id)}
                />

                <FlatLists 
                 title="Trending Now" 
                 data = {this.props.trendingNow}
                 type = "large"
                //  onPress={(id) => console.log(id)}
                />

                <FlatLists 
                 title="New Releases" 
                 data = {this.props.newReleases}
                 type = "medium"
                //  onPress={(id) => console.log(id)}
                />
                    
            </View>
            )}
            </>
        )
    }
}