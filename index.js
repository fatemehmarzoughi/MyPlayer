import "react-native-gesture-handler";
// import * as Sentry from "@sentry/react-native";
// // import { Navigation } from 'react-native-navigation';
// import App from "./App";
// Sentry.init({
//   dsn: "https://85abaf902a834e97908fa49f14b2331d@o1096284.ingest.sentry.io/6116705"
// //     integrations: [
// //     new Sentry.ReactNativeTracing({
// //       routingInstrumentation: new Sentry.ReactNativeNavigationInstrumentation(
// //         Navigation,
// //       )
// //     }),
// //   ],
// });
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// // registerRootComponent(App);
// registerRootComponent(Sentry.wrap(App));

import { registerRootComponent } from "expo";
import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
