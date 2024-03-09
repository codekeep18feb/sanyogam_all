// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  const babelLoader = config.module.rules.find(
    (rule) => rule && rule.loader && rule.loader.includes('babel-loader')
  );

  if (babelLoader) {
    babelLoader.exclude = path.resolve('src');
  }

  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: path.resolve('src'),
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
        // Add any other Babel configurations you need
      },
    },
  });

  // Set the output path to 'dist'
  config.output.path = path.resolve('dist');

  return config;
};
