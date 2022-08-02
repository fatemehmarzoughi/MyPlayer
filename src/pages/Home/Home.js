import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import MainHeader from "components/pagesHeader/MainHeader";
import Notification from "../../Notification/NotificationSetup";
import { changeColor } from "components/lightDarkTheme";
import context from "context/context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  FadeInLeft,
  FadeOutLeft
} from "react-native-reanimated";
import { styles } from "./style";
import { Heading, Text, VStack, FlatList } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "components/Modals/subCategoryModal";
import FlatLists from "components/pagesFlatLists/HomeFlatLists/FlatList";
import { connect } from "react-redux";
import {
  getAllRecommended,
  getAllMostWatched,
  getAllTrendingNow,
  getAllNewReleases
} from "Redux/actions/getAllItems";
import {
  getBanner
} from "Redux/actions/getBanner";
import { getAllMusics } from "Redux/actions/getMusics";
import { getAllMovies } from "Redux/actions/getMovies";
import { getAllSports } from "Redux/actions/getSports";
import { getAllRadio } from "Redux/actions/getRadio";
import FastImage from "react-native-fast-image";
import LottieView from "lottie-react-native";

function useHook (Component) {
  return (props) => {
    const offset = useSharedValue(5);

    const animatedStyles = useAnimatedStyle(() => {
      return {

        transform: [{ translateX: offset.value }]

      };
    });

    return (
            <Component {...props} animatedStyles={animatedStyles} offset={offset} />
    );
  };
}

class Home extends React.Component {
  static contextType = context;

  constructor () {
    super();
    this.state = {
      data: [
        {
          id: 0,
          name: "All",
          size: 8,
          subCategory: []
        },
        {
          id: 1,
          name: "Musics",
          size: 1,
          subCategory: [
            {
              name: "All"
            },
            {
              name: "Happy"
            },
            {
              name: "Sad"
            },
            {
              name: "jazz"
            }
          ]
        },
        {
          id: 2,
          name: "Movies",
          size: 1,
          subCategory: [
            {
              name: "All"
            },
            {
              name: "horror"
            },
            {
              name: "comedy"
            },
            {
              name: "action"
            }
          ]
        },
        {
          id: 3,
          name: "Sports",
          size: 1,
          subCategory: []
        },
        {
          id: 4,
          name: "Radio",
          size: 1,
          subCategory: []
        }
      ],

      dotPosition: 25,
      showSubCategory: false,
      subCategoryTitle: "",
      subCategoryVisibility: false,
      selectedSubCategory: "All", // selected subCategory
      selectedCategory: 0, // selected category

      loading: false,

      showAllCategory: 0,
      refreshingCategories: true
    };
    this._isMounted = false;
  }

  notify = () => {
    Notification.scheduleNotification(new Date(Date.now() + (5 * 1000)));
  };

  async componentDidMount () {
    this._isMounted = true;
    this._isMounted && await this.props.getBanner();
    this._isMounted && await this.props.getAllRecommended();
    this._isMounted && await this.props.getAllMostWatched();
    this._isMounted && await this.props.getAllTrendingNow();
    this._isMounted && await this.props.getAllNewReleases();

    this._isMounted && await this.props.getAllMusics();
    this._isMounted && await this.props.getAllMovies();
    this._isMounted && await this.props.getAllSports();
    this._isMounted && await this.props.getAllRadio();

    this.props.offset.value = withRepeat(withTiming(0), 10000, true);
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  categoryPressed = (id) => {
    this.setState({ refreshingCategories: true });
    const categoryItems = [...this.state.data];
    categoryItems.map(item => item.size === 1);
    categoryItems[id].size = 8;
    const showSubCategory = categoryItems[id].subCategory.length !== 0;
    this.setState({
      data: categoryItems,
      showSubCategory,
      subCategoryTitle: categoryItems[id].name,
      selectedCategory: id,
      selectedSubCategory: "All",
      showAllCategory: id
    });
  };

  subCategoryOpenModal = () => {
    console.log("modal");
    this.setState({
      subCategoryVisibility: true
    });
  };

  selectedSbCategory = (selectedSubCategory) => {
    this.setState({
      selectedSubCategory,
      subCategoryVisibility: false
    });
  };

  closeModal = () => {
    this.setState({
      subCategoryVisibility: false
    });
  };

  onRefresh = async () => {
    this.setState({
      loading: true
    });
    try {
      this._isMounted && await this.props.getBanner();
      this._isMounted && await this.props.getAllRecommended();
      this._isMounted && await this.props.getAllMostWatched();
      this._isMounted && await this.props.getAllTrendingNow();
      this._isMounted && await this.props.getAllNewReleases();

      this._isMounted && await this.props.getAllMusics();
      this._isMounted && await this.props.getAllMovies();
      this._isMounted && await this.props.getAllSports();
      this._isMounted && await this.props.getAllRadio();

      console.log(this.props.banner.banner[0].largImageUrl);
      this.setState({
        loading: false
      });
    } catch (err) { console.log(err); };
  };

  render () {
    const { loadingBanner, banner } = this.props.banner;
    const { loading, trendingNow, recommended, newReleases, mostWatched } = this.props.AllItems;
    const { loadingMusics, trendingNowMusics, recommendedMusics, newReleasesMusics, mostWatchedMusics } = this.props.musics;
    const { loadingMovies, trendingNowMovies, recommendedMovies, newReleasesMovies, mostWatchedMovies } = this.props.movies;
    const { loadingSports, trendingNowSports, recommendedSports, newReleasesSports, mostWatchedSports } = this.props.sports;
    const { loadingRadio, trendingNowRadio, recommendedRadio, newReleasesRadio, mostWatchedRadio } = this.props.radio;

    let myRecommended, myTrendingNow, myNewReleases, myMostWatched;
    if (this.state.selectedCategory === 0) {
      if (!loading) {
        setTimeout(() => {
          this.setState({ refreshingCategories: false });
        }, 1000);
      }
      myRecommended = [];
      myTrendingNow = [];
      myNewReleases = [];
      myMostWatched = [];

      myRecommended = recommended;
      myTrendingNow = trendingNow;
      myNewReleases = newReleases;
      myMostWatched = mostWatched;
    } else if (this.state.selectedCategory === 1) {
      if (!loadingMusics) {
        setTimeout(() => {
          this.setState({ refreshingCategories: false });
        }, 1000);
      }
      myRecommended = [];
      myTrendingNow = [];
      myNewReleases = [];
      myMostWatched = [];

      myRecommended = recommendedMusics;
      myMostWatched = mostWatchedMusics;
      myNewReleases = newReleasesMusics;
      myTrendingNow = trendingNowMusics;
    } else if (this.state.selectedCategory === 2) {
      if (!loadingMovies) {
        setTimeout(() => {
          this.setState({ refreshingCategories: false });
        }, 1000);
      }

      myRecommended = [];
      myTrendingNow = [];
      myNewReleases = [];
      myMostWatched = [];

      myRecommended = recommendedMovies;
      myMostWatched = mostWatchedMovies;
      myNewReleases = newReleasesMovies;
      myTrendingNow = trendingNowMovies;
    } else if (this.state.selectedCategory === 3) {
      if (!loadingSports) {
        setTimeout(() => {
          this.setState({ refreshingCategories: false });
        }, 1000);
      }

      myRecommended = [];
      myTrendingNow = [];
      myNewReleases = [];
      myMostWatched = [];

      myRecommended = recommendedSports;
      myMostWatched = mostWatchedSports;
      myNewReleases = newReleasesSports;
      myTrendingNow = trendingNowSports;
    } else if (this.state.selectedCategory === 4) {
      if (!loadingRadio) {
        setTimeout(() => {
          this.setState({ refreshingCategories: false });
        }, 1000);
      }

      myRecommended = [];
      myTrendingNow = [];
      myNewReleases = [];
      myMostWatched = [];

      myRecommended = recommendedRadio;
      myMostWatched = mostWatchedRadio;
      myNewReleases = newReleasesRadio;
      myTrendingNow = trendingNowRadio;
    }

    return (
            <ScrollView
              refreshControl = {
                <RefreshControl
                  refreshing = {this.state.loading}
                  onRefresh = {() => this.onRefresh()}
                />
              }
            >
                <MainHeader
                  searchOnPress={() => this.props.navigation.navigate("Search") }
                  menuOnPress={() => this.props.navigation.openDrawer()}
                />
                {/* Top Banner */}
                <View style={styles.banner}>
                   <FastImage
                       alt="Audio/Video of the Day"
                       style={styles.bannerImage}
                       source={{
                         uri: banner[0].largImageUrl,
                         priority: FastImage.priority.high
                       }}
                       resizeMode={FastImage.resizeMode.cover}
                   />
                  <View style={styles.bannerContent}>
                    <VStack space={2}>
                      <Text style={styles.texts} fontSize="lg">Audio/Video of the day</Text>
                      <Heading style={styles.texts} bold fontSize="2xl">The Item's Title</Heading>
                      <TouchableOpacity>
                        <VStack flexDirection='row'>
                          <Text style={styles.texts} fontSize="sm" italic>Watch Now</Text>
                          <Animated.View style={[this.props.animatedStyles]}>
                             <Icon name="return-down-back-outline" style={[styles.icon]} />
                          </Animated.View>
                        </VStack>
                      </TouchableOpacity>
                    </VStack>
                  </View>
                </View>

                {/* Category Tabs */}
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.data}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem = {({ item }) => (
                      <VStack alignItems="center">
                          <Text onPress={() => this.categoryPressed(item.id)} style={[styles.categoryName, changeColor(this.context.theme)]}>
                            {item.name}
                          </Text>
                          <Icon style={[changeColor(this.context.theme)]} size={item.size} name="ellipse" />
                      </VStack>
                  )}
                />

                {/* Sub Category Tab */}
                <>
                {this.state.showSubCategory
                  ? (
                <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
                    <VStack flexDirection="row" style={styles.subCategory}>
                       <Text style={changeColor(this.context.theme)}>{this.state.subCategoryTitle} &gt; </Text>
                       <TouchableOpacity
                         onPress={() => this.subCategoryOpenModal()}
                         style={[styles.selectSubCategory]}
                        >
                          <VStack flexDirection="row" alignItems="center">
                            <Text>{this.state.selectedSubCategory} </Text>
                            <Icon name="chevron-down-outline" />
                          </VStack>
                       </TouchableOpacity>

                    </VStack>
                </Animated.View>
                    )
                  : (
                    <Text></Text>
                    )}
                </>

            <>
            {this.state.refreshingCategories
              ? <LottieView
                  loop={true}
                  autoPlay={true}
                  source={require("../../assets/Images/loading.json")}
                  size={10}
                  style={{ width: 50, height: 50, marginLeft: "auto", marginRight: "auto" }}
                />
              : <View>
                {/* <FlatLists
                 title="My Playlist"
                 data = {this.state.falstListData}
                 type = "small"
                 onPress={(id) => console.log(id)}
                /> */}

                <FlatLists
                 title="Recommended"
                 data = {myRecommended}
                 type = "medium"
                //  onPress={(id) => console.log(id)}
                />

                <FlatLists
                 title="Most Watched"
                 data = {myMostWatched}
                 type = "medium"
                //  onPress={(id) => console.log(id)}
                />

                <FlatLists
                 title="Trending Now"
                 data = {myTrendingNow}
                 type = "large"
                //  onPress={(id) => console.log(id)}
                />

                <FlatLists
                 title="New Releases"
                 data = {myNewReleases}
                 type = "medium"
                //  onPress={(id) => console.log(id)}
                />

            </View>
            }
            </>

                <Modal
                 subCategoryVisibility = {this.state.subCategoryVisibility}
                 data = {this.state.data[this.state.selectedCategory].subCategory}
                 selectedCategory = {this.state.selectedCategory}
                 selectedSbCategory = {this.selectedSbCategory}
                 closeModal = {this.closeModal}
                />

                {/* <Text onPress={() => this.notify()}>Text notification</Text>
                <Text onPress={() => this.props.navigation.openDrawer()}>Text notification</Text> */}
            </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AllItems: state.allItems,
    banner: state.banner,
    musics: state.musics,
    movies: state.movies,
    sports: state.sports,
    radio: state.radio
  };
};
const mapDispatchToProps = {
  getBanner,
  getAllRecommended,
  getAllMostWatched,
  getAllTrendingNow,
  getAllNewReleases,

  getAllMusics,
  getAllMovies,
  getAllSports,
  getAllRadio
};

export default connect(mapStateToProps, mapDispatchToProps)(useHook(Home));
