import React, {useMemo} from 'react';
import {ScrollView,StyleSheet, View} from 'react-native';
import {dark} from 'src/assets';
import {FlatLists, ITVDataType} from 'src/components';

export const Radio = React.memo(() => {
  const data: ITVDataType[] = useMemo(
    () => [
      {
        id: 0,
        uri: 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
        stared: true,
      },
      {
        id: 1,
        uri: 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
        stared: false,
      },
      {
        id: 2,
        uri: 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
        stared: false,
      },
      {
        id: 3,
        uri: 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
        stared: false,
      },
      {
        id: 4,
        uri: 'https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/43100/jpeg',
        stared: false,
      },
    ],
    [],
  );

  return (
    <ScrollView>
      <View>
        <FlatLists data={data} title="Most Watched" />
        <FlatLists data={data} title="All" />
        <FlatLists data={data} title="News" />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  image: {
    margin: 10,
    marginLeft: 0,
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  icon: {
    backgroundColor: dark,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 14,
    padding: 5,
  },
});
