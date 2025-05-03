module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  verbose: true,
  modulePathIgnorePatterns: [
    '<rootDir>/dashboard/safedrive-clean'
  ]
};
