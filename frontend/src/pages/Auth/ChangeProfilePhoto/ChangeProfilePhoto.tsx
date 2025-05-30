import {NavigationProp} from '@react-navigation/native';
import React, {useCallback,useContext, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {GET} from 'src/API';
import * as Colors from 'src/assets/constants/Colors';
import {contentColor, FlatList1, PageWrapper} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';

export interface IChangeProfilePhotoProps {
  navigation: NavigationProp<any, any>;
}

export const ChangeProfilePhoto = React.memo<IChangeProfilePhotoProps>(
  ({navigation}) => {
    const context = useContext(Context);

    const [animationImages, setAnimationImages] = useState([]);
    const [artistImages, setArtistImages] = useState([]);
    const [actorImages, setActorImages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // const getImages = useCallback(async () => {
    //   try {
    //     const resultAnimation = await GET({
    //       endpoint: '/images/imageLists/Animation',
    //     });
    //     const Animation = await (resultAnimation as any).json();

    //     const resultArtists = await GET({
    //       endpoint: '/images/imageLists/Artists',
    //     });
    //     const Artists = await (resultArtists as any).json();

    //     const resultActors = await GET({endpoint: '/images/imageLists/Actors'});
    //     const Actors = await (resultActors as any).json();

    //     setAnimationImages(Animation);
    //     setArtistImages(Artists);
    //     setActorImages(Actors);
    //     setRefreshing(false);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }, []);

    // useEffect(() => {
    //   getImages();
    // }, [getImages]);

    const onPress = (imageURL: string) => {
      console.log('imageURL  == ' + imageURL);
      // context.setUserImage(imageURL);
      navigation.navigate('EditProfile');
    };

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            // onRefresh={getImages}
          />
        }>
        <PageWrapper>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconBack}>
              <Icon name="chevron-left" size={40} color={Colors.white} />
            </TouchableOpacity>
            <Text style={[styles.titleHeader, contentColor(context.theme)]}>
              Choose a Photo
            </Text>
          </View>

          {animationImages.length === 0 ||
          actorImages.length === 0 ||
          artistImages.length === 0 ? (
            <View>
              <FlatList1
                data={animationImages}
                title="Animation"
                func={() => {}}
                loading={true}
                theme={context.theme}
              />
              <FlatList1
                data={artistImages}
                title="Artists"
                func={() => {}}
                loading={true}
                theme={context.theme}
              />
              <FlatList1
                data={actorImages}
                title="Actors"
                func={() => {}}
                loading={true}
                theme={context.theme}
              />
            </View>
          ) : (
            <View>
              <FlatList1
                data={animationImages}
                title="Animation"
                func={onPress}
                theme={context.theme}
              />
              <FlatList1
                data={artistImages}
                title="Artists"
                func={onPress}
                theme={context.theme}
              />
              <FlatList1
                data={actorImages}
                title="Actors"
                func={onPress}
                theme={context.theme}
              />
            </View>
          )}
        </PageWrapper>
      </ScrollView>
    );
  },
);
