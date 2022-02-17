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

## How to write Testable Components

The [diagram](/component..png) shows the new proposed and the old way of designing components. The benefit of building components in a new way is that there is a lot of `separation of concerns` and the component itself become much simpler.

```js
   Component ===> Business Logic(Hooks) ====> Data Stor(Context/Redux)
```

All the component in this repo is designed in that way and you can see how testing is simpler as

-   We have to mock less stuff
-   We test what is required with confidence.

An example would be [add-todo.tsx](src/components/add-todo.tsx)

The above approach with a mindset of testing from user prospective can give us test with better confidence. So what is this user prospective, it is basically testing the components the way the user would interact with them and avoid creating a new test user persona.

One example to User based testing is, that we avoid mocking stuff like `fetch` or network calls, as we would want to test it as close to user. So we use libraries like `miragejs` or `msw` to mock the `fetch` at network layer and create a full user experience while testing. This way we can test the different state the user would see during the network request or after it success or fails.
An example would be the [login.spec.tsx](test/login.spec.tsx).

Another point to keep in mind is, mock stuff smartly, for example if you are trying to test a specific flow in a component and don't care about the other components included/rendered, its better to mock them. For example in the [app.spec.tsx](test/app.spec.tsx) we want to test the `itenary` condition that it renders correct component based on the state, but we don't really care what the contents of each component are, so we mock the components as we don't want to render those unnecessarily in the test.

```js
jest.mock("components/todos", () => ({
    __esModule: true,
    default: () => {
        return <h2>Todos</h2>;
    },
}));
```

#### Jest debugging

-   Node has a flag inspect-brk that will add a break point to the start of the process

```
   "test:debug": "node --inspect-brk",
```

-   Then we can hook up the Chrome devtool to the process we want to debug.

```
 "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand
--watch
",
```

-   We cannot use jest like that since than it would be passed as argument to the node, so we need to provide the path to the jest binary.
-   We also don't want the default Jest behaviour of running test in parallel, so we set the runInBand to run them in the same process.
-   Now run the test:debug script and then go to `chrome://inspect`.
-   Selecting the debugger will open the test debugger and it will stop in the debugger line.
