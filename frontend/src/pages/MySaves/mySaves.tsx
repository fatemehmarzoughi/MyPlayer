import {NavigationProp} from '@react-navigation/native';
import {useQuery} from '@realm/react';
import {Divider, HStack, Text, View, VStack} from 'native-base';
import React, {useContext, useEffect} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {mainColor} from 'src/assets';
import {contentColor, MainHeader} from 'src/components';
import {backgroundColor, surfaceColor} from 'src/components/lightDarkTheme';
import Context from 'src/context/context';
import {ItemProperties} from 'src/Realm';

import {styles} from './styles';

export interface IMySavesProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export const MySaves: React.FC<IMySavesProps> = React.memo(({navigation}) => {
  const items = useQuery<ItemProperties>('Item');

  const {theme} = useContext(Context);

  useEffect(() => {
    console.log(items as unknown as ItemProperties);
  }, [items]);

  return (
    <View style={styles.container}>
      <MainHeader
        searchOnPress={() => navigation.navigate('Search')}
        menuOnPress={() => navigation.openDrawer()}
      />
      <FlatList
        data={items}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => {
          const {title, cover, watched, likes} = item;
          return (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('AVRoot', {id: item.id})}>
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
                      <Icon
                        name="heart"
                        style={contentColor(theme)}
                        size={12}
                      />
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
                  <Icon
                    name="play-circle"
                    style={{color: mainColor}}
                    size={32}
                  />
                )}
              </TouchableOpacity>
              <Divider height={0.45} />
            </View>
          );
        }}
      />
    </View>
  );
});
