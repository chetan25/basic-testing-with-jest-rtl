const path = require("path");
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    // roots: ["<rootDir>//"],
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.jest.json",
        },
    },
    transform: {
        "^.+\\.(|ts|tsx)$": "ts-jest",
        // '^.+\\.(png|jpg)$': '<rootDir>/test-helpers/helpers/empty-module.js'
    },
    moduleDirectories: [
        "node_modules",
        // eslint-disable-next-line no-undef
        path.join(__dirname, "src"),
        "components",
        // eslint-disable-next-line no-undef
        path.join(__dirname, "test"),
    ],
    moduleNameMapper: {
        "^src/(.*)": "<rootDir>/src/$1",
        "^utils/(.*)": "<rootDir>/test/utils/$1",
        "\\.module\\.css$": "identity-obj-proxy", // this makes sure we can import css module and preserve the class name
        "\\.scss$": require.resolve("./test/mocks/style-mocks.js"), // this will mock all the scss import to empty object
    },
    testMatch: ["<rootDir>/test/**/*.spec.+(ts|tsx|js)"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    collectCoverageFrom: ["**/src/*.(ts|tsx)"],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
    ],
};