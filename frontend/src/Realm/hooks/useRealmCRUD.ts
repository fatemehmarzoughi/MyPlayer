import {createRealmContext} from '@realm/react';
import {useCallback, useEffect} from 'react';

import {useRealmContext} from '../context';
import {ItemProperties, realmConfig} from '../models';

export type IUseRealmCRUD = {
  onRealmChange?: () => void;
};

export type IWrite = {
  object: Partial<OmittedRealmTypes<ItemProperties>>;
  name: string;
};

export const useRealmCRUD = ({onRealmChange}: IUseRealmCRUD) => {
  const {useRealm, useQuery, useObject} = useRealmContext();
  const realm = useRealm();

  const writeObject = useCallback(
    ({object, name}: IWrite) => {
      realm.write(() => {
        realm.create(name, object);
      });
    },
    [realm],
  );

  const updateObject = useCallback(
    ({updatingQuery}: {updatingQuery: () => void}) => {
      realm.write(updatingQuery);
    },
    [realm],
  );

  const deleteObject = useCallback(
    ({name}: Omit<IWrite, 'object'>) => {
      realm.write(() => {
        realm.delete(name);
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

  return {writeObject, updateObject, deleteObject, useQuery, useObject};
};
