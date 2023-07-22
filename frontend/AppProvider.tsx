import { createRealmContext, RealmProvider } from '@realm/react';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {App, realmConfig} from 'src';
import ContextProvider from 'src/context/contextProvider';
import {mainReducer} from 'src/Redux';

export const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const AppProvider: React.FC = React.memo(() => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ContextProvider>
          <RealmProvider {...realmConfig}>
            <App />
          </RealmProvider>
        </ContextProvider>
      </NativeBaseProvider>
    </Provider>
  );
});

export default AppProvider;
