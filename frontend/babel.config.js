const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "module:metro-react-native-babel-preset",
      "babel-preset-expo",
      "@babel/preset-react",
      [
        "@babel/preset-flow",
        {
          "allowDeclareFields": true
        }
      ]
    ],
    plugins: [
      [
        "babel-plugin-module-resolver",
        {
          extensions: ['.js', '.ts', '.tsx', '.ios.js', '.ios.ts', '.android.js', '.android.ts', '.json'],
          root: ["."],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
