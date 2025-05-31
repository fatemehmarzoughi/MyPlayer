import {NavigationProp} from '@react-navigation/native';
import {useQuery} from '@realm/react';
import {View} from 'native-base';
import React, {useEffect} from 'react';
import {CommonList, MainHeader} from 'src/components';
import {ItemProperties} from 'src/Realm';

import {styles} from './styles';

export interface IMySavesProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export const MySaves = React.memo<IMySavesProps>(({navigation}) => {
  const items = useQuery<ItemProperties>('Item');

  useEffect(() => {
    console.log(items as unknown as ItemProperties);
  }, [items]);

  return (
    <View style={styles.container}>
      <MainHeader
        searchOnPress={() => navigation.navigate('Search')}
        menuOnPress={() => navigation.openDrawer()}
      />

      <CommonList
        items={items.map(i => {
          return {
            id: i.id,
            attributes: i,
          };
        })}
        onPress={id => navigation.navigate('AVRoot', {id})}
      />
    </View>
  );
});
