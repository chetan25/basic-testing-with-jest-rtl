import React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
const Wrapper = ({ children }: { children: React.ReactElement }) => {
    return <div>{children}</div>;
};
const render = (ui: React.ReactElement, options: RenderOptions = {}) => {
    return rtlRender(ui, {
        wrapper: Wrapper,
        ...options,
    });
};
export * from "@testing-library/react";
export { render };