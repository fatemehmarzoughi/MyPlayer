import React from 'react';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {NativeBaseProvider} from 'native-base';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {mainReducer} from 'src/Redux';
import ContextProvider from 'src/context/contextProvider';
import {App} from 'src';

export const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default class AppProvider extends React.PureComponent {
  override render() {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
