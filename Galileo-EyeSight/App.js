import React, {useState} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';
import AppLoading from 'expo-app-loading';
import ReduxThunk from 'redux-thunk';
import { StatusBar } from 'react-native';

import authReducer from './store/reducers/auth';
import resultsReducer from './store/reducers/result';
import NavigationContainer from './navigation/NavigationContainer';

// https://galileo-eyesight-default-rtdb.firebaseio.com/
// AIzaSyBja9bg0WZoATdY8NPQUS5mtud9WEkQ9q8

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });      
};

const rootReducer = combineReducers({
  auth: authReducer,
  results: resultsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  if(!fontLoaded){
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
      <StatusBar barStyle={'default'} backgroundColor={'black'}/>
    </Provider>
  );
}