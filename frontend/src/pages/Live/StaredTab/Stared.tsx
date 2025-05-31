import React, {useCallback,useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity,View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {dark, white} from 'src/assets';
import {ITVDataType} from 'src/components';

export const Stared = React.memo(() => {
  const [data, setData] = useState<ITVDataType[]>([
    {
      id: 0,
      uri: 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
      stared: true,
    },
    {
      id: 1,
      uri: 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/4115/jpeg',
      stared: true,
    },
  ]);

  const toggleStared = useCallback((id: number) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? {...item, stared: !item.stared} : item,
      ),
    );
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={{
              uri: item.uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TouchableOpacity
            style={styles.icons}
            onPress={() => toggleStared(item.id)}>
            <Icon
              name={item.stared ? 'star' : 'star-outline'}
              size={25}
              color={white}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  image: {
    margin: 10,
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  icons: {
    backgroundColor: dark,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 14,
    padding: 5,
  },
  icon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});
