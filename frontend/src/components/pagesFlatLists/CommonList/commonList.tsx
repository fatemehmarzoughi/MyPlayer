import {Divider, HStack, Text, VStack} from 'native-base';
import React, {useContext} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {mainColor} from 'src/assets';
import {contentColor} from 'src/components/lightDarkTheme';
import context from 'src/context/context';
import {ItemProperties} from 'src/Realm/models';

import {styles} from './style';
import { Attributes, Item } from 'src/API/types';

export type CommonListProps = {
  items: Attributes<Item>[];
  onPress: (id: number) => void;
};

export const CommonList = React.memo(({items, onPress}: CommonListProps) => {
  const {theme} = useContext(context);
  return (
    <FlatList
      data={items}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => {
        const {title, cover, watched, likes} = item.attributes;
        return (
          <View key={item.id}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => onPress(item.id)}>
              <View style={styles.startPart}>
                <FastImage source={{uri: cover}} style={styles.coverImage} />
                <VStack width="60%" style={styles.titles}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    {...contentColor(theme)}>
                    {title}
                  </Text>
                  <HStack alignItems={'center'} space={1}>
                    <Icon name="heart" style={contentColor(theme)} size={12} />
                    <Text {...contentColor(theme)} fontSize="xs">
                      {likes} Likes
                    </Text>
                  </HStack>
                </VStack>
              </View>
              {watched ? (
                <Icon
                  name="checkmark-circle"
                  style={{color: 'green'}}
                  size={32}
                />
              ) : (
                <Icon name="play-circle" style={{color: mainColor}} size={32} />
              )}
            </TouchableOpacity>
            <Divider height={0.45} />
          </View>
        );
      }}
    />
  );
});
