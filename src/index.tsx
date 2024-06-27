import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { GlobalProvider } from "store/global";
import StyleProvider from "store/style-provider";
import startServer from "mocks/server";

if (process.env.NODE_ENV === "development") {
    console.log("In development or test");
    startServer();
}

ReactDOM.render(
    <GlobalProvider>
        <StyleProvider>
            <App />
        </StyleProvider>
    </GlobalProvider>,
    document.querySelector("#root")
);
