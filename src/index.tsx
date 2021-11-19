import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { GlobalProvider } from "store/global";
import StyleProvider from "store/style-provider";

ReactDOM.render(
    <GlobalProvider>
        <StyleProvider>
            <App />
        </StyleProvider>
    </GlobalProvider>,
    document.querySelector("#root")
);
