const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["babel-plugin-module-resolver",
        {
          root: ["./src"]
        }
      ],
      "react-native-reanimated/plugin"
    ]
  };
};
