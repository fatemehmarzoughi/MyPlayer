import {useQuery, useRealm, useObject} from '@realm/react';
import {useCallback, useEffect} from 'react';
import Toast from 'react-native-toast-message';

import {ItemProperties} from '../models';

export type IUseRealmCRUD = {
  onRealmChange?: () => void;
};

export type IWrite = {
  object: Partial<OmittedRealmTypes<ItemProperties>>;
  name: string;
};

export const useRealmCRUD = ({onRealmChange}: IUseRealmCRUD) => {
  const realm = useRealm();

  const writeObject = useCallback(
    ({object, name}: IWrite) => {
      realm.write(() => {
        realm.create(name, object);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Saved to successfully',
          autoHide: true,
          visibilityTime: 10,
          topOffset: 30,
          bottomOffset: 40,
        });
      });
    },
    [realm],
  );

  const updateObject = useCallback(
    ({updatingQuery}: {updatingQuery: () => void}) => {
      realm.write(updatingQuery);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Updated successfully',
        autoHide: true,
        visibilityTime: 10,
        topOffset: 30,
        bottomOffset: 40,
      });
    },
    [realm],
  );

  const deleteObject = useCallback(
    (collection: Omit<IWrite | unknown, 'object' | never>) => {
      realm.write(() => {
        realm.delete(collection);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Deleted successfully',
          autoHide: true,
          visibilityTime: 10,
          topOffset: 30,
          bottomOffset: 40,
        });
      });
    },
    [realm],
  );

  useEffect(() => {
    try {
      if (onRealmChange) realm.addListener('change', onRealmChange);
    } catch (error) {
      console.error(
        `An exception was thrown within the change listener: ${error}`,
      );
    }

    return () => {
      if (onRealmChange) realm.removeListener('change', onRealmChange);
    };
  }, [onRealmChange, realm]);

  return {writeObject, updateObject, deleteObject, useQuery, useObject, realm};
};
