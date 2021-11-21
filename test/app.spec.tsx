import React from "react";
import { renderWithProviders } from "utils/render";
import App from "src/app";
import translator from "src/lang/translator";

describe("Test App Component", () => {
    it("Should render Login when no user is there", () => {
        // arrange
        const { queryByText, queryByTestId } = renderWithProviders(<App />);

        // assert
        expect(queryByText(translator("login"))).toBeInTheDocument();
        expect(queryByTestId(translator("greeting"))).not.toBeInTheDocument();

        // debug();
    });

    it("Should render Greeting when user is there", () => {
        // arrange
        const { queryByTestId, queryByText } = renderWithProviders(<App />, {
            defaultState: {
                user: {
                    userName: "Test",
                },
            },
        });

        // assert
        expect(queryByTestId(translator("login"))).not.toBeInTheDocument();
        expect(queryByTestId(translator("greeting"))).toBeInTheDocument();
        expect(queryByText(/Hello Test/i)).toBeInTheDocument();
    });
});
