const path = require('path');

const PATHS = {
  nodeModules: path.resolve(__dirname, 'node_modules'),
  src: path.resolve(__dirname, 'src'),
  mocks: path.resolve(__dirname, '.mocks'),
  tsConfig: path.resolve(__dirname, 'tsconfig.json'),
};

module.exports = PATHS;
