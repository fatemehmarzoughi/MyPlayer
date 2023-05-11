import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Animated, {
  withTiming,
  withRepeat,
  FadeInLeft,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { ConnectedProps, connect } from "react-redux";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationScreenProp } from "react-navigation";
import { Heading, Text, VStack, FlatList } from "native-base";

import {
  getAllRecommended,
  getAllMostWatched,
  getAllTrendingNow,
  getAllNewReleases,
} from "~/Redux/actions/getAllItems";
import {
  getBanner,
  getAllRadio,
  getAllMovies,
  getAllMusics,
  getAllSports,
} from "~/Redux/actions";
import context from "~/context/context";
import Modal from "~/components/Modals/subCategoryModal";
import { changeColor } from "~/components/lightDarkTheme";
import Notification from "~/Notification/NotificationSetup";
import MainHeader from "~/components/pagesHeader/MainHeader";
import FlatLists from "~/components/pagesFlatLists/HomeFlatLists/FlatList";

import { styles } from "./style";

export type ISubjectCategory = {
  id: number;
  name: "Musics" | "All" | "Movies" | "Sports" | "Radio";
  size: number;
  subCategory: {
    name: string;
  }[];
};

export interface IHomeProps
  extends NavigationScreenProp<any, any>,
    IHomeDispatchProps {
  navigation: { openDrawer: () => void } & NavigationScreenProp<any, any>;

  animatedStyles: any;
  offset: { value: number };
}

export interface IHomeMapState {
  radio: any;
  banner: any;
  musics: any;
  movies: any;
  sports: any;
  allItems: any;
}

export interface IHomeStates {
  loading: boolean;
  dotPosition: number;
  showAllCategory: number;
  data: ISubjectCategory[];
  showSubCategory: boolean;
  subCategoryTitle: string;
  selectedCategory: number; // selected category
  selectedSubCategory: string; // selected subCategory
  refreshingCategories: boolean;
  subCategoryVisibility: boolean;
}

function useHook(Component: React.ComponentClass<IHomeProps, IHomeStates>) {
  return (props: IHomeProps) => {
    const offset = useSharedValue(5);

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: offset.value }],
      };
    });

    return (
      <Component {...props} animatedStyles={animatedStyles} offset={offset} />
    );
  };
}

class Home extends React.Component<IHomeProps, IHomeStates> {
  declare context: React.ContextType<typeof context>
  private _isMounted: boolean;

  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          name: "All",
          size: 8,
          subCategory: [],
        },
        {
          id: 1,
          name: "Musics",
          size: 1,
          subCategory: [
            {
              name: "All",
            },
            {
              name: "Happy",
            },
            {
              name: "Sad",
            },
            {
              name: "jazz",
            },
          ],
        },
        {
          id: 2,
          name: "Movies",
          size: 1,
          subCategory: [
            {
              name: "All",
            },
            {
              name: "horror",
            },
            {
              name: "comedy",
            },
            {
              name: "action",
            },
          ],
        },
        {
          id: 3,
          name: "Sports",
          size: 1,
          subCategory: [],
        },
        {
          id: 4,
          name: "Radio",
          size: 1,
          subCategory: [],
        },
      ],

      dotPosition: 25,
      showSubCategory: false,
      subCategoryTitle: "",
      subCategoryVisibility: false,
      selectedSubCategory: "All", // selected subCategory
      selectedCategory: 0, // selected category

      loading: false,

      showAllCategory: 0,
      refreshingCategories: true,
    };
    this._isMounted = false;
  }

  notify = () => {
    Notification.scheduleNotification(new Date(Date.now() + 5 * 1000));
  };

  categoryPressed = (id: number) => {
    this.setState(({ data }) => ({
      data: data.filter((i) => {
        if (i.id === id) return data.map((i) => (i.size = 8));
        else return data;
      }),
      showSubCategory: data.find((i) => i.id === id)?.subCategory.length !== 0,
      subCategoryTitle: data.find((i) => i.id === id)?.name ?? "",
      selectedCategory: id,
      selectedSubCategory: "All",
      showAllCategory: id,

      refreshingCategories: true,
    }));
  };

  subCategoryOpenModal = () => {
    console.log("modal");
    this.setState({
      subCategoryVisibility: true,
    });
  };

  selectedSbCategory = (selectedSubCategory: string) => {
    this.setState({
      selectedSubCategory,
      subCategoryVisibility: false,
    });
  };

  closeModal = () => {
    this.setState({
      subCategoryVisibility: false,
    });
  };

  onRefresh = async () => {
    this.setState({
      loading: true,
    });
    try {
      this._isMounted && (await this.props.getBanner());
      this._isMounted && (await this.props.getAllRecommended());
      this._isMounted && (await this.props.getAllMostWatched());
      this._isMounted && (await this.props.getAllTrendingNow());
      this._isMounted && (await this.props.getAllNewReleases());

      this._isMounted && (await this.props.getAllMusics());
      this._isMounted && (await this.props.getAllMovies());
      this._isMounted && (await this.props.getAllSports());
      this._isMounted && (await this.props.getAllRadio());

      this.setState({
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  override async componentDidMount() {
    this._isMounted = true;
    this._isMounted && (await this.props.getBanner());
    this._isMounted && (await this.props.getAllRecommended());
    this._isMounted && (await this.props.getAllMostWatched());
    this._isMounted && (await this.props.getAllTrendingNow());
    this._isMounted && (await this.props.getAllNewReleases());

    this._isMounted && (await this.props.getAllMusics());
    this._isMounted && (await this.props.getAllMovies());
    this._isMounted && (await this.props.getAllSports());
    this._isMounted && (await this.props.getAllRadio());

    this.props.offset.value = withRepeat(withTiming(0), 10000, true);
  }

  override componentWillUnmount() {
    this._isMounted = false;
  }

  override render() {
    const { loadingBanner, banner } = this.props.banner;
    const { loading, trendingNow, recommended, newReleases, mostWatched } =
      this.props.AllItems;
    const {
      loadingMusics,
      trendingNowMusics,
      recommendedMusics,
      newReleasesMusics,
      mostWatchedMusics,
    } = this.props.musics;
    const {
      loadingMovies,
      trendingNowMovies,
      recommendedMovies,
      newReleasesMovies,
      mostWatchedMovies,
    } = this.props.movies;
    const {
      loadingSports,
      trendingNowSports,
      recommendedSports,
      newReleasesSports,
      mostWatchedSports,
    } = this.props.sports;
    const {
      loadingRadio,
      trendingNowRadio,
      recommendedRadio,
      newReleasesRadio,
      mostWatchedRadio,
    } = this.props.radio;

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
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={() => this.onRefresh()}
          />
        }
      >
        <MainHeader
          searchOnPress={() => this.props.navigation.navigate("Search")}
          menuOnPress={() => this.props.navigation.openDrawer()}
        />
        {/* Top Banner */}
        <View style={styles.banner}>
          <FastImage
            style={styles.bannerImage}
            source={{
              uri: banner[0].largImageUrl,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.bannerContent}>
            <VStack space={2}>
              <Text style={styles.texts} fontSize="lg">
                Audio/Video of the day
              </Text>
              <Heading style={styles.texts} bold fontSize="2xl">
                The Item's Title
              </Heading>
              <TouchableOpacity>
                <VStack flexDirection="row">
                  <Text style={styles.texts} fontSize="sm" italic>
                    Watch Now
                  </Text>
                  <Animated.View style={[this.props.animatedStyles]}>
                    <Icon
                      name="return-down-back-outline"
                      style={[styles.icon]}
                    />
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
          renderItem={({ item }) => (
            <VStack alignItems="center">
              <Text
                onPress={() => this.categoryPressed(item.id)}
                style={[styles.categoryName, changeColor(this.context.theme)]}
              >
                {item.name}
              </Text>
              <Icon
                style={[changeColor(this.context.theme)]}
                size={item.size}
                name="ellipse"
              />
            </VStack>
          )}
        />

        {/* Sub Category Tab */}
        <>
          {this.state.showSubCategory ? (
            <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
              <VStack flexDirection="row" style={styles.subCategory}>
                <Text style={changeColor(this.context.theme)}>
                  {this.state.subCategoryTitle} &gt;{" "}
                </Text>
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
          ) : (
            <Text></Text>
          )}
        </>

        <>
          {this.state.refreshingCategories ? (
            <LottieView
              loop={true}
              autoPlay={true}
              source={require("../../assets/Images/loading.json")}
              style={{
                width: 50,
                height: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
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
                data={myRecommended}
                type="medium"
                //  onPress={(id) => console.log(id)}
              />

              <FlatLists
                title="Most Watched"
                data={myMostWatched}
                type="medium"
                //  onPress={(id) => console.log(id)}
              />

              <FlatLists
                title="Trending Now"
                data={myTrendingNow}
                type="large"
                //  onPress={(id) => console.log(id)}
              />

              <FlatLists
                title="New Releases"
                data={myNewReleases}
                type="medium"
                //  onPress={(id) => console.log(id)}
              />
            </View>
          )}
        </>

        <Modal
          closeModal={this.closeModal}
          selectedSbCategory={this.selectedSbCategory}
          subCategoryVisibility={this.state.subCategoryVisibility}
          data={
            this.state.data.find((i) => i.id === this.state.selectedCategory)
              ?.subCategory
          }
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: IHomeMapState) => {
  return {
    AllItems: state.allItems,
    banner: state.banner,
    musics: state.musics,
    movies: state.movies,
    sports: state.sports,
    radio: state.radio,
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
  getAllRadio,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type IHomeDispatchProps = ConnectedProps<typeof connector>;

export default connector(useHook(Home));
