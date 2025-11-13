module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@/theme': './src/theme',
            '@/components': './src/components',
            '@/hooks': './src/hooks',
            '@/utils': './src/utils',
            '@/screens': './src/screens',
            '@/navigation': './src/navigation'
          }
        }
      ]
    ]
  };
};
