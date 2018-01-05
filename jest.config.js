const path = require('path');
const PATHS = require('./paths');

module.exports = {
  transform: {
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testMatch: ['**/*.test.ts{x}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  unmockedModulePathPatterns: [
    'react',
    'react-dom',
    'react-addons-test-utils',
    'enzyme'
  ],
  moduleDirectories: [PATHS.nodeModules, PATHS.src],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': path.join(PATHS.mocks, 'fileMock.js')
  },
  setupFiles: ['raf/polyfill'],
  setupTestFrameworkScriptFile: '<rootDir>/test.setup.js'
};
