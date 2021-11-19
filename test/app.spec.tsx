import React from "react";
import { render } from "utils/render";
import App from "src/app";
const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};
describe("Test App", () => {
    it("Should render", () => {
        const { debug } = render(<App />, {
            wrapper: Wrapper,
        });
        debug();
    });
});