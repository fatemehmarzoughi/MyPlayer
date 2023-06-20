
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "react-native",
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"]
};