
module.exports = {
  name: 'API integration tests',
  testMatch: ['<rootDir>/test/**/?(*.)+(spec|test).js'],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/out-tsc/',
    '<rootDir>./cache/'
  ],
  transform: {},
};