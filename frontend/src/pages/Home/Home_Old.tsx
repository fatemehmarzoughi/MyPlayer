import {FlatList, Heading, Spinner,Text, VStack} from 'native-base';
import React from 'react';
import {RefreshControl, ScrollView, TouchableOpacity,View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect,ConnectedProps} from 'react-redux';
import {GetItemsResponseBody, ItemCategory, ItemLabel, ItemType} from 'src/API';
import {contentColor,HomeFlatLists, MainHeader} from 'src/components';
import Context from 'src/context/context';
import Notification from 'src/Notification/NotificationSetup';
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
  IRadioActions,
  ISportActions,
} from 'src/Redux';

import {NetworkError} from '../Errors';
import {styles} from './style';

export type ISubjectCategory = {
  id: number;
  name: ItemCategory | 'All';
  size: number;
  subCategory: {
    name: string;
  }[];
};

// export interface IHomeProps extends IHomeDispatchProps {
//   navigation: any;
// }

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

class Home extends React.PureComponent<IHomeProps, IHomeStates> {
  static override contextType = Context;
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

  tabRendering = (): GetItemsResponseBody | undefined => {
    const {allItems} = this.props.allItems;
    const {musics} = this.props.musics;
    const {movies} = this.props.movies;
    const {sports} = this.props.sports;
    const {radio} = this.props.radio;

    switch (this.state.selectedCategory) {
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
    if (
      [
        !!this.props.allItems.error,
        !!this.props.musics.error,
        !!this.props.movies.error,
        !!this.props.sports.error,
        !!this.props.radio.error,
      ].includes(true)
    ) {
      console.log([
        this.props.allItems.error,
        this.props.musics.error,
        this.props.movies.error,
        this.props.sports.error,
        this.props.radio.error,
      ]);
      return <NetworkError onReload={this.onRefresh} />;
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.onRefresh}
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
              uri: this.props.banner.banner?.data.attributes.items.data
                .attributes.cover,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.bannerContent}>
            <VStack space={2}>
              <Text style={styles.texts} fontSize="lg">
                {this.props.banner.banner?.data.attributes.items.data
                .attributes.type} of the day
              </Text>
              <Heading style={styles.texts} bold fontSize="5xl" fontStyle={'italic'}>
                {this.props.banner.banner?.data.attributes.items.data.attributes.title}
              </Heading>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AVRoot', {id: this.props.banner.banner?.data.attributes.items.data.id})}>
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
                onPress={() => {
                  this.setState({
                    selectedCategory: item.name,
                  });
                }}
                style={[styles.categoryName, contentColor(this.context.theme)]}>
                {item.name}
              </Text>
              <Icon
                style={[
                  contentColor(this.context.theme),
                  {opacity: item.name === this.state.selectedCategory ? 1 : 0},
                ]}
                size={8}
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
                <Text style={contentColor(this.context.theme)}>
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
            <Spinner
              size={'lg'}
              accessibilityLabel="Loading posts"
              color="warning.500"
              style={{
                alignSelf: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            />
          ) : (
            <View>
              <HomeFlatLists
                title="Recommended"
                data={
                  this.tabRendering()?.data.filter(
                    i => i.attributes.label === ItemLabel.Recommended,
                  ) ?? []
                }
                type="medium"
                onPress={id => this.props.navigation.navigate('AVRoot', {id})}
              />

              <HomeFlatLists
                title="Most Watched"
                data={
                  this.tabRendering()?.data.filter(
                    i => i.attributes.label === ItemLabel.MostWatched,
                  ) ?? []
                }
                type="medium"
                onPress={id => this.props.navigation.navigate('AVRoot', {id})}
              />

              <HomeFlatLists
                title="Trending Now"
                data={
                  this.tabRendering()?.data.filter(
                    i => i.attributes.label === ItemLabel.TrendingNow,
                  ) ?? []
                }
                type="large"
                onPress={id => this.props.navigation.navigate('AVRoot', {id})}
              />

              <HomeFlatLists
                title="New Releases"
                data={
                  this.tabRendering()?.data.filter(
                    i => i.attributes.label === ItemLabel.NewReleases,
                  ) ?? []
                }
                type="medium"
                onPress={id => this.props.navigation.navigate('AVRoot', {id})}
              />
            </View>
          )}
        </>

        {/* <ModalClass
          closeModal={(props) => {
            this.setState({
              subCategoryVisibility: false,
            });
          }}
          selectedSbCategory={this.selectedSbCategory}
          subCategoryVisibility={this.state.subCategoryVisibility}
          data={
            this.state.data.find(i => String(i.id) === this.state.selectedSubCategory)
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
