import {createRealmContext} from "@realm/react";
import {useCallback, useEffect} from "react";

import {ISchemas, realmConfig} from "../models";

export type IUseRealmMethods = {
  onRealmChange: () => void;
};
export type IWrite = {
  name: ISchemas;
};

export const useRealmMethods = ({onRealmChange}: IUseRealmMethods) => {
  const {useRealm} = createRealmContext(realmConfig);
  const realm = useRealm();

  const write = useCallback(
    ({name}: IWrite) => {
      realm.write(() => {
        realm.create("Profile", {
          name: name,
          _id: new Realm.BSON.ObjectId(),
        });
      });
    },
    [realm],
  );

  useEffect(() => {
    try {
      realm.addListener("change", onRealmChange);
    } catch (error) {
      console.error(
        `An exception was thrown within the change listener: ${error}`,
      );
    }

    return () => {
      realm.removeListener("change", onRealmChange);
    };
  }, [onRealmChange, realm]);

  return {write};
};
