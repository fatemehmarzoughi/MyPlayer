import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {App} from 'src';
import ContextProvider from 'src/context/contextProvider';
import {useRealmContext} from 'src/Realm/context';
import {mainReducer} from 'src/Redux';

export const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const AppProvider: React.FC = React.memo(() => {
  const {RealmProvider} = useRealmContext();
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ContextProvider>
          <RealmProvider>
            <App />
          </RealmProvider>
        </ContextProvider>
      </NativeBaseProvider>
    </Provider>
  );
});

export default AppProvider;
