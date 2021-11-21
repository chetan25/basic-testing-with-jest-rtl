---
title: Basic Testing Best Practices.
excerpt: A simple React based UI to apply some testing principles.
Tools: ["React", "React Testing Library", "Jest", Webpack', "miragejs", "@chakra-ui/react"]
---

# Basic Testing Best Practices

## Basic Jest Configuration

#### Steps to Configure Typescript in Jest

Jest out of the box understands `.js` extension, in order to write tests in typescript follow the steps:

-   Install `ts-jest` as devDependency and type definition for Jest and any other testing library in use.
-   Now configure the `jest.config.js` to use the `ts-jest`

```js
preset: "ts-jest", // point the Jest preset to use the ts-jest configuration
testEnvironment: "jsdom", // jsdom since we are building for browser and shoudl test with dom like environment
moduleFileExtensions: ["ts", "tsx", "js", "json"],
globals: {
    "ts-jest": {
        tsconfig: "tsconfig.jest.json", // provide path to the tsconfig if its different than 'tsconfig.json'
    },
},
transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest", // tell jest how to trasform your files
},
```

-   Note we have a custom `tsconfig.jest.json` since we have overwritten the module option, as Jest only understands `CommonJS`

```js
  {
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "module": "CommonJS"
    }
}
```

Now with this setup we can write test in typescript.

**_ Note for Aliases in Jest files refer [here](https://github.com/chetan25/learning-and-findings/blob/main/WEBPACK.md#alias-with-webpack-and-typescript) _**

#### Basic handy configuration options

-   `setupFilesAfterEnv` option is handy if we want to do some setup, which might be required in every test, for example setting the `jest-dom` expect for each test

```js
setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
```

-   `watchPlugins` - This is useful option to configure if you use the `watch` mode a lot.

```js
   watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
```
