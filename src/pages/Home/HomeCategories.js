import React from 'react';
import { 
    Text,
    View,
} from 'react-native';
import FlatLists from 'components/pagesFlatLists/HomeFlatLists/FlatList';


export default class Categories extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
    }

    render(){
        // this.props.refreshing ? {} : {}
        return(
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
                 onPress={(id) => console.log(id)}
                />

                <FlatLists 
                 title="Most Watched" 
                 data = {this.props.mostWatched}
                 type = "medium"
                 onPress={(id) => console.log(id)}
                />

                <FlatLists 
                 title="Trending Now" 
                 data = {this.props.trendingNow}
                 type = "large"
                 onPress={(id) => console.log(id)}
                />

                <FlatLists 
                 title="New Releases" 
                 data = {this.props.newReleases}
                 type = "medium"
                 onPress={(id) => console.log(id)}
                />
                    
            </View>
        )
    }
}