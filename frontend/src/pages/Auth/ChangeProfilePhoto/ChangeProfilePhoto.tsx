import React from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {NavigationProp} from '@react-navigation/native';

import context from 'src/context/context';
import * as Colors from 'src/assets/constants/Colors';

import {contentColor, FlatList1} from 'src/components';
import { GET } from 'src/API';

import {styles} from './style';

export interface IChangeProfilePhotoProps {
  navigation: NavigationProp<any, any>;
}

export type IChangeProfilePhotoState = {
  Animation: [];
  Artists: [];
  Actors: [];
  refreshing: boolean;
};

export class ChangeProfilePhoto extends React.PureComponent<
  IChangeProfilePhotoProps,
  IChangeProfilePhotoState
> {
  declare context: React.ContextType<typeof context>;

  constructor(props: IChangeProfilePhotoProps) {
    super(props);
    this.state = {
      Animation: [],
      Artists: [],
      Actors: [],
      refreshing: false,
    };
  }

  getImages = async () => {
    try {
      const resultAnimation = await GET('/images/imageLists/Animation');
      const Animation = await (resultAnimation as any).json();

      const resultArtists = await GET('/images/imageLists/Artists');
      const Artists = await (resultArtists as any).json();

      const resultActors = await GET('/images/imageLists/Actors');
      const Actors = await (resultActors as any).json();

      this.setState({
        Animation,
        Artists,
        Actors,
        refreshing: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  override async componentDidMount() {
    await this.getImages();
  }

  onPress = (imageURL: string) => {
    console.log('imageURL  == ' + imageURL);
    this.context.setUserImage(imageURL);
    this.props.navigation.navigate('EditProfile');
  };

  override render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => this.getImages()}
            refreshing={this.state.refreshing}
          />
        }>
        <View style={styles.container}>
          <View style={[styles.header]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}
              style={styles.iconBack}>
              <Icon name="chevron-left" size={40} color={Colors.white} />
            </TouchableOpacity>
            <Text style={[styles.titleHeader, contentColor(this.context.theme)]}>
              Choose a Photo
            </Text>
          </View>
          {/* <Header
                     title="Choose a Photo"
                     customClick={() => this.props.navigation.navigate('EditProfile')}
                     theme={this.context.theme}
                    /> */}
          <>
            {this.state.Animation.length === 0 ||
            this.state.Actors.length === 0 ||
            this.state.Artists.length === 0 ? (
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
                  func={imageURL => this.onPress(imageURL)}
                  theme={this.context.theme}
                />

                <FlatList1
                  data={this.state.Artists}
                  title="Artists"
                  func={imageURL => this.onPress(imageURL)}
                  theme={this.context.theme}
                />

                <FlatList1
                  data={this.state.Actors}
                  title="Actors"
                  func={imageURL => this.onPress(imageURL)}
                  theme={this.context.theme}
                />
              </View>
            )}
          </>
        </View>
      </ScrollView>
    );
  }
}
