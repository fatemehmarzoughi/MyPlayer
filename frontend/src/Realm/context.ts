import {createRealmContext} from '@realm/react';

import {realmConfig} from './models';

export const useRealmContext = () => {

  return createRealmContext(realmConfig);
};
