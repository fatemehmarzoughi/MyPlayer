import {FlatList, Heading, Spinner, Text, VStack} from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect, ConnectedProps} from 'react-redux';
import {GetItemsResponseBody, ItemCategory, ItemLabel} from 'src/API';
import {contentColor, HomeFlatLists, MainHeader} from 'src/components';
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

export interface IHomeMapState {
  radio: IRadioActions;
  banner: IBannerAction;
  musics: IMusicsAction;
  movies: IMoviesAction;
  sports: ISportActions;
  allItems: IAllItemsAction;
}

export type ISubjectCategory = {
  id: number;
  name: ItemCategory | 'All';
  size: number;
  subCategory: {
    name: string;
  }[];
};
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

const data = [
  {id: 0, name: 'All', size: 8, subCategory: []},
  {
    id: 1,
    name: ItemCategory.Music,
    size: 1,
    subCategory: [
      {name: 'All'},
      {name: 'Happy'},
      {name: 'Sad'},
      {name: 'jazz'},
    ],
  },
  {
    id: 2,
    name: ItemCategory.Movie,
    size: 1,
    subCategory: [
      {name: 'All'},
      {name: 'horror'},
      {name: 'comedy'},
      {name: 'action'},
    ],
  },
  {id: 3, name: ItemCategory.Sport, size: 1, subCategory: []},
  {id: 4, name: ItemCategory.Radio, size: 1, subCategory: []},
];

const Home = React.memo(({navigation, ...props}: IHomeProps) => {
  const context = useContext(Context);

  // const [data, setData] = useState(initialData);
  const [dotPosition, setDotPosition] = useState(25);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [subCategoryTitle, setSubCategoryTitle] = useState('');
  const [subCategoryVisibility, setSubCategoryVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ItemCategory | 'All'
  >('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [refreshingCategories, setRefreshingCategories] = useState(false);

  const notify = () => {
    Notification.scheduleNotification(new Date(Date.now() + 5 * 1000));
  };

  const subCategoryOpenModal = () => setSubCategoryVisibility(true);

  const selectedSbCategory = (selected: string) => {
    setSelectedSubCategory(selected);
    setSubCategoryVisibility(false);
  };

  const onRefresh = useCallback(async () => {
    setLoading(true);
    try {
      await props.getBanner();
      await props.getAllItems();
      await props.getAllMusics();
      await props.getAllMovies();
      await props.getAllSports();
      await props.getAllRadio();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [props]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const tabRendering = (): GetItemsResponseBody | undefined => {
    switch (selectedCategory) {
      case 'All':
        return props.allItems.allItems;
      case ItemCategory.Movie:
        return props.movies.movies;
      case ItemCategory.Music:
        return props.musics.musics;
      case ItemCategory.Radio:
        return props.radio.radio;
      case ItemCategory.Sport:
        return props.sports.sports;
      default:
        return props.allItems.allItems;
    }
  };

  const hasErrors = [
    props.allItems.error,
    props.musics.error,
    props.movies.error,
    props.sports.error,
    props.radio.error,
  ].some(Boolean);

  if (hasErrors) {
    return <NetworkError onReload={onRefresh} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }>
      <MainHeader
        searchOnPress={() => navigation.navigate('Search')}
        menuOnPress={() => navigation.openDrawer()}
      />

      <View style={styles.banner}>
        <FastImage
          style={styles.bannerImage}
          source={{
            uri: props.banner.banner?.data.attributes.items.data.attributes
              .cover,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.bannerContent}>
          <VStack space={2}>
            <Text style={styles.texts} fontSize="lg">
              {props.banner.banner?.data.attributes.items.data.attributes.type}{' '}
              of the day
            </Text>
            <Heading
              style={styles.texts}
              bold
              fontSize="5xl"
              fontStyle={'italic'}>
              {props.banner.banner?.data.attributes.items.data.attributes.title}
            </Heading>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AVRoot', {
                  id: props.banner.banner?.data.attributes.items.data.id,
                })
              }>
              <VStack flexDirection="row">
                <Text style={styles.texts} fontSize="sm" italic>
                  Watch Now
                </Text>
                <Animated.View>
                  <Icon name="return-down-back-outline" style={styles.icon} />
                </Animated.View>
              </VStack>
            </TouchableOpacity>
          </VStack>
        </View>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <VStack alignItems="center">
            <Text
              onPress={() => setSelectedCategory(item.name as ItemCategory)}
              style={[styles.categoryName, contentColor(context.theme)]}>
              {item.name}
            </Text>
            <Icon
              style={[
                contentColor(context.theme),
                {opacity: item.name === selectedCategory ? 1 : 0},
              ]}
              size={8}
              name="ellipse"
            />
          </VStack>
        )}
      />

      {showSubCategory ? (
        <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
          <VStack flexDirection="row" style={styles.subCategory}>
            <Text style={contentColor(context.theme)}>
              {subCategoryTitle} &gt;{' '}
            </Text>
            <TouchableOpacity
              onPress={subCategoryOpenModal}
              style={styles.selectSubCategory}>
              <VStack flexDirection="row" alignItems="center">
                <Text>{selectedSubCategory} </Text>
                <Icon name="chevron-down-outline" />
              </VStack>
            </TouchableOpacity>
          </VStack>
        </Animated.View>
      ) : (
        <Text></Text>
      )}

      {refreshingCategories ? (
        <Spinner
          size="lg"
          accessibilityLabel="Loading posts"
          color="warning.500"
          style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto'}}
        />
      ) : (
        <View>
          <HomeFlatLists
            title="Recommended"
            data={
              tabRendering()?.data.filter(
                i => i.attributes.label === ItemLabel.Recommended,
              ) ?? []
            }
            type="medium"
            onPress={id => navigation.navigate('AVRoot', {id})}
          />

          <HomeFlatLists
            title="Most Watched"
            data={
              tabRendering()?.data.filter(
                i => i.attributes.label === ItemLabel.MostWatched,
              ) ?? []
            }
            type="medium"
            onPress={id => navigation.navigate('AVRoot', {id})}
          />

          <HomeFlatLists
            title="Trending Now"
            data={
              tabRendering()?.data.filter(
                i => i.attributes.label === ItemLabel.TrendingNow,
              ) ?? []
            }
            type="large"
            onPress={id => navigation.navigate('AVRoot', {id})}
          />

          <HomeFlatLists
            title="New Releases"
            data={
              tabRendering()?.data.filter(
                i => i.attributes.label === ItemLabel.NewReleases,
              ) ?? []
            }
            type="medium"
            onPress={id => navigation.navigate('AVRoot', {id})}
          />
        </View>
      )}

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
});

const mapStateToProps = (state: IHomeMapState) => ({
  allItems: state.allItems,
  banner: state.banner,
  musics: state.musics,
  movies: state.movies,
  sports: state.sports,
  radio: state.radio,
});

const mapDispatchToProps = {
  getAllItems,
  getBanner,
  getAllMusics,
  getAllMovies,
  getAllSports,
  getAllRadio,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type IHomeProps = ConnectedProps<typeof connector> & {
  navigation: any;
};

export default connector(Home);
