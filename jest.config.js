module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/tests/**/*.spec.[jt]s'],
};
