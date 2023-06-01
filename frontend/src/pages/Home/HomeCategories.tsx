import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { HomeFlatLists } from "src/components";

export interface ICategoriesProps {
  refreshing: boolean,
  recommended: [],
  mostWatched: [],
  trendingNow: [],
  newReleases: []
}
export interface ICategoriesStates {
  data: { url: string }[];
}
export default class Categories extends React.Component<
  ICategoriesProps,
  ICategoriesStates
> {
  constructor(props: ICategoriesProps) {
    super(props);
    this.state = {
      data: [
        {
          url: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/42314/jpg",
        },
        {
          url: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/42314/jpg",
        },
        {
          url: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/42314/jpg",
        },
      ],
    };
  }

  override componentDidMount() {
    console.log("categories is rendering");
  }

  override shouldComponentUpdate() {
    return true;
  }

  override render() {
    return (
      <>
        {this.props.refreshing ? (
          <LottieView
            loop={true}
            autoPlay={true}
            source={require("../../assets/Images/loading.json")}
            // size={10}
            style={{
              width: 50,
              height: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        ) : (
          <View>
            {/* <HomeFlatLists
                 title="My Playlist"
                 data = {this.state.falstListData}
                 type = "small"
                 onPress={(id) => console.log(id)}
                /> */}

            <HomeFlatLists
              title="Recommended"
              data={this.props.recommended}
              type="medium"
              //  onPress={(id) => console.log(id)}
            />

            <HomeFlatLists
              title="Most Watched"
              data={this.props.mostWatched}
              type="medium"
              //  onPress={(id) => console.log(id)}
            />

            <HomeFlatLists
              title="Trending Now"
              data={this.props.trendingNow}
              type="large"
              //  onPress={(id) => console.log(id)}
            />

            <HomeFlatLists
              title="New Releases"
              data={this.props.newReleases}
              type="medium"
              //  onPress={(id) => console.log(id)}
            />
          </View>
        )}
      </>
    );
  }
}
