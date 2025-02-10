module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'], // Only test files inside `tests/` folder
    setupFiles: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        "^@models/(.*)$": "<rootDir>/app/models/$1",
    },

  };

