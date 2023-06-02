import {View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import Animated, {
  withTiming,
  withRepeat,
  FadeInLeft,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import {ConnectedProps, connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {Heading, Text, VStack, FlatList} from 'native-base';

import Context from 'src/context/context';
import Notification from 'src/Notification/NotificationSetup';

import {HomeFlatLists, MainHeader, changeColor} from 'src/components';
import {
  getAllItems,
  getAllMovies,
  getAllMusics,
  getAllRadio,
  getAllSports,
  getBanner,
  IAllItemsAction,
  IBannerAction,
  IMoviesAction,
  IMusicsAction,
  ISportActions,
  IRadioActions,
} from 'src/Redux';
import {GetItemsResponseBody, ItemCategory, ItemLabel} from 'src/API';

import {styles} from './style';

export type ISubjectCategory = {
  id: number;
  name: ItemCategory | 'All';
  size: number;
  subCategory: {
    name: string;
  }[];
};

export interface IHomeProps
  extends NavigationProp<any, any>,
    IHomeDispatchProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export interface IHomeMapState {
  radio: IRadioActions;
  banner: IBannerAction;
  musics: IMusicsAction;
  movies: IMoviesAction;
  sports: ISportActions;
  allItems: IAllItemsAction;
}

export interface IHomeStates {
  loading: boolean;
  dotPosition: number;
  showAllCategory: number;
  data: ISubjectCategory[];
  showSubCategory: boolean;
  subCategoryTitle: string;
  selectedCategory: ItemCategory | 'All'; // selected category
  selectedSubCategory: string; // selected subCategory
  refreshingCategories: boolean;
  subCategoryVisibility: boolean;
}

// function useHook(Component: React.ComponentClass<IHomeProps, IHomeStates>) {
//   return (props: IHomeProps) => {
//     const offset = useSharedValue(5);

//     const animatedStyles = useAnimatedStyle(() => {
//       return {
//         transform: [{translateX: offset.value}],
//       };
//     });

//     return (
//       <Component {...props} animatedStyles={animatedStyles} offset={offset} />
//     );
//   };
// }

class Home extends React.Component<IHomeProps, IHomeStates> {
  declare context: React.ContextType<typeof Context>;
  private _isMounted: boolean;

  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          name: 'All',
          size: 8,
          subCategory: [],
        },
        {
          id: 1,
          name: ItemCategory.Music,
          size: 1,
          subCategory: [
            {
              name: 'All',
            },
            {
              name: 'Happy',
            },
            {
              name: 'Sad',
            },
            {
              name: 'jazz',
            },
          ],
        },
        {
          id: 2,
          name: ItemCategory.Movie,
          size: 1,
          subCategory: [
            {
              name: 'All',
            },
            {
              name: 'horror',
            },
            {
              name: 'comedy',
            },
            {
              name: 'action',
            },
          ],
        },
        {
          id: 3,
          name: ItemCategory.Sport,
          size: 1,
          subCategory: [],
        },
        {
          id: 4,
          name: ItemCategory.Radio,
          size: 1,
          subCategory: [],
        },
      ],

      dotPosition: 25,
      showSubCategory: false,
      subCategoryTitle: '',
      subCategoryVisibility: false,
      selectedSubCategory: 'All', // selected subCategory
      selectedCategory: 'All', // selected category

      loading: false,

      showAllCategory: 1,
      refreshingCategories: false,
    };
    this._isMounted = false;
  }

  notify = () => {
    Notification.scheduleNotification(new Date(Date.now() + 5 * 1000));
  };

  categoryPressed = (item: ISubjectCategory) => {
    this.setState({
      selectedCategory: item.name,
    });
  };

  subCategoryOpenModal = () => {
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

  onRefresh = async () => {
    this.setState({
      loading: true,
    });
    try {
      this._isMounted && (await this.props.getBanner());

      this._isMounted && (await this.props.getAllItems());
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

    this._isMounted && (await this.props.getAllItems());
    this._isMounted && (await this.props.getAllMusics());
    this._isMounted && (await this.props.getAllMovies());
    this._isMounted && (await this.props.getAllSports());
    this._isMounted && (await this.props.getAllRadio());

    // this.props.offset.value = withRepeat(withTiming(0), 10000, true);
  }

  override componentWillUnmount() {
    this._isMounted = false;
  }

  tabRendering = (
    selectedTab: ItemCategory | 'All',
  ): GetItemsResponseBody | undefined => {
    const {allItems} = this.props.allItems;
    const {musics} = this.props.musics;
    const {movies} = this.props.movies;
    const {sports} = this.props.sports;
    const {radio} = this.props.radio;

    switch (selectedTab) {
      case 'All':
        return allItems;
      case ItemCategory.Movie:
        return movies;
      case ItemCategory.Music:
        return musics;
      case ItemCategory.Radio:
        return radio;
      case ItemCategory.Sport:
        return sports;
      default:
        return allItems;
    }
  };

  override render() {
    const {banner} = this.props.banner;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={() => this.onRefresh()}
          />
        }>
        <MainHeader
          searchOnPress={() => this.props.navigation.navigate('Search')}
          menuOnPress={() => this.props.navigation.openDrawer()}
        />
        {/* Top Banner */}
        <View style={styles.banner}>
          <FastImage
            style={styles.bannerImage}
            source={{
              uri: banner?.data.attributes.items.data.attributes.cover,
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
                  <Animated.View
                  // style={[this.props.animatedStyles]}
                  >
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
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <VStack alignItems="center">
              <Text
                onPress={() => this.categoryPressed(item)}
                style={[styles.categoryName, changeColor(this.context.theme)]}>
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
                  {this.state.subCategoryTitle} &gt;{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => this.subCategoryOpenModal()}
                  style={[styles.selectSubCategory]}>
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
              source={require('../../assets/Images/loading.json')}
              style={{
                width: 50,
                height: 50,
                marginLeft: 'auto',
                marginRight: 'auto',
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

              <HomeFlatLists
                title="Recommended"
                data={
                  this.tabRendering('All')?.data.filter(
                    i => i.attributes.label === ItemLabel.Recommended,
                  ) ?? []
                }
                type="medium"
                //  onPress={(id) => console.log(id)}
              />

              <HomeFlatLists
                title="Most Watched"
                data={
                  this.tabRendering(ItemCategory.Music)?.data.filter(
                    i => i.attributes.label === ItemLabel.MostWatched,
                  ) ?? []
                }
                type="medium"
                //  onPress={(id) => console.log(id)}
              />

              <HomeFlatLists
                title="Trending Now"
                data={
                  this.tabRendering(ItemCategory.Music)?.data.filter(
                    i => i.attributes.label === ItemLabel.TrendingNow,
                  ) ?? []
                }
                type="large"
                //  onPress={(id) => console.log(id)}
              />

              <HomeFlatLists
                title="New Releases"
                data={
                  this.tabRendering(ItemCategory.Music)?.data.filter(
                    i => i.attributes.label === ItemLabel.NewReleases,
                  ) ?? []
                }
                type="medium"
                //  onPress={(id) => console.log(id)}
              />
            </View>
          )}
        </>

        {/* <ModalClass
          // closeModal={(props) => {
          //   this.setState({
          //     subCategoryVisibility: false,
          //   });
          // }}
          selectedSbCategory={this.selectedSbCategory}
          subCategoryVisibility={this.state.subCategoryVisibility}
          data={
            this.state.data.find(i => i.id === this.state.selectedCategory)
              ?.subCategory
          }
        /> */}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: IHomeMapState) => {
  return {
    allItems: state.allItems,
    banner: state.banner,
    musics: state.musics,
    movies: state.movies,
    sports: state.sports,
    radio: state.radio,
  };
};

const mapDispatchToProps = {
  getAllItems,
  getBanner,
  getAllMusics,
  getAllMovies,
  getAllSports,
  getAllRadio,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type IHomeDispatchProps = ConnectedProps<typeof connector>;

export default connector(Home);
