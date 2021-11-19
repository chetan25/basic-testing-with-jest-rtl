import React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { GlobalProvider, initialState, GlobalState } from "store/global";
import StyleProvider from "store/style-provider";

type CustomRenderProps = {
    defaultState?: GlobalState;
    renderOptions?: RenderOptions;
};

const renderWithProviders = (
    ui: React.ReactElement,
    { defaultState = initialState, renderOptions = {} }: CustomRenderProps = {}
) => {
    const Wrapper = ({ children }: { children: React.ReactElement }) => {
        return (
            <GlobalProvider defaultValue={defaultState}>
                <StyleProvider>{children}</StyleProvider>
            </GlobalProvider>
        );
    };

    return rtlRender(ui, {
        wrapper: Wrapper,
        ...renderOptions,
    });
};
export * from "@testing-library/react";
export { renderWithProviders };
