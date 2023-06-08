/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './AppProvider';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
