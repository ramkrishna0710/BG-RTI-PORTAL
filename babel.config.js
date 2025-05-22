module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@components': './src/components',
            '@unistyles': './src/unistyles',
            '@utils': './src/utils',
            '@api': './src/api',
            '@constants': './src/constants',
            '@contexts': './src/contexts',
          },
        },
      ],
    ],
  };
};
