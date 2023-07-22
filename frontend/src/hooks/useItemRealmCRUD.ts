import {useQuery} from '@realm/react';
import {useCallback} from 'react';
import {ItemProperties, useRealmCRUD} from 'src/Realm';

export const useItemRealmCRUD = () => {
  const {writeObject} = useRealmCRUD({});
  const items = useQuery('Item');

  const writeItem = useCallback(
    ({object}: { object: ItemProperties}) => {
      const itemExists = items.filtered(`id == ${object.id}`);
      if (itemExists) return;
      else
        writeObject({
          name: 'Item',
          object,
        });
    },
    [items, writeObject],
  );

  return {writeItem};
};
