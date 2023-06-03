import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Item, Attributes} from 'src/API';
import Context from 'src/context/context';
import { contentColor } from 'src/components/lightDarkTheme';

import {styles} from './style';

export interface IHomeFlatListsStates {}
export interface IHomeFlatListsProps {
  title: string;
  type: 'large' | 'medium' | 'small';
  data: Attributes<Item>[];
}

export class HomeFlatLists extends React.PureComponent<
  IHomeFlatListsProps,
  IHomeFlatListsStates
> {
  declare context: React.ContextType<typeof Context>

  override render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.rowTitle, contentColor(this.context.theme)]}>{this.props.title}</Text>
        <FlatList
          horizontal
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            // <TouchableOpacity onPress={() => this.props.onPress(item.id)}>
            <TouchableOpacity>
              <FastImage
                style={[
                  styles.item,
                  this.props.type === 'large'
                    ? styles.itemLarge
                    : this.props.type === 'medium'
                    ? styles.itemMid
                    : styles.itemSmall,
                ]}
                source={{
                  uri: item.attributes.cover,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
