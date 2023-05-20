const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
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
          alias: {
            "~": path.resolve(__dirname, "src"),
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
