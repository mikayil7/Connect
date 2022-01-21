import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RNBootSplash from 'react-native-bootsplash';

import Routes from './src/navigation';
import reducers from './src/reducers/reducers';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

const App = () => {
  useEffect(() => {
    const init = async () => {
      console.log('SPLASH SCREEN');
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
    });
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
