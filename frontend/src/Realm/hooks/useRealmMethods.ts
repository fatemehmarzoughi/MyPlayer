import {useCallback} from 'react';
import {createRealmContext} from '@realm/react';
import {ISchemas, realmConfig} from '../models';

export type IWrite = {
  name: ISchemas;
};

export const useRealmMethods = () => {
  const {useRealm} = createRealmContext(realmConfig);
  const realm = useRealm();

  const write = useCallback(({name}: IWrite) => {
    realm.write(() => {
      realm.create('Profile', {
        name: name,
        _id: new Realm.BSON.ObjectId(),
      });
    });
  }, []);

  return {write};
};
