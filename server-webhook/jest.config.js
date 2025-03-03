// jest.config.js
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
  ],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  //preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;

