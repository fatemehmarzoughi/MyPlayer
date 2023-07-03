import {NavigationProp} from '@react-navigation/native';
import {useQuery} from '@realm/react';
import React, {useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {MainHeader} from 'src/components';
import {ItemProperties} from 'src/Realm';

export interface IMySavesProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export const MySaves: React.FC<IMySavesProps> = React.memo(({navigation}) => {
  const items = useQuery('Item');

  useEffect(() => {
    console.log((items as unknown as ItemProperties)[0].title);
  }, [items]);

  return (
    <ScrollView>
      <MainHeader
        searchOnPress={() => navigation.navigate('Search')}
        menuOnPress={() => navigation.openDrawer()}
      />
      {(items as unknown as ItemProperties[]).map(i => (
        <Text
          key={String(i.id)}
          onPress={() => navigation.navigate('AVRoot', {id: i.id})}>
          {i.title}
        </Text>
      ))}
    </ScrollView>
  );
});
