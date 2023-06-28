import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {useRealmCRUD} from 'src/Realm/hooks';
export interface IMySavesProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}
export const MySaves: React.FC<IMySavesProps> = React.memo(() => {
  const {useObject, useQuery} = useRealmCRUD({});
  const items = useQuery('Item');
  return (
    <>
      {items.map(i => {
        <Text>{i[0]}</Text>;
      })}
    </>
  );
});
