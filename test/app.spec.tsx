import React from "react";
import { renderWithProviders, waitFor } from "utils/render";
import App from "src/app";

// since we don't want to render the full component
// to mock a default component we need to set the  __esModule: true,
jest.mock("components/login", () => ({
    __esModule: true,
    default: () => {
        return <h2>Login</h2>;
    },
}));

jest.mock("components/todos", () => ({
    __esModule: true,
    default: () => {
        return <h2>Todos</h2>;
    },
}));

describe("Test App Component", () => {
    it("Should render Login when no user is there", async () => {
        // arrange
        const { queryByText } = renderWithProviders(<App />);

        // assert
        await waitFor(() => {
            expect(queryByText(/Todos/i)).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText(/Login/i)).toBeInTheDocument();
        });

        // debug();
    });

    it("Should render Todos when user is there", async () => {
        // arrange
        const { queryByText } = renderWithProviders(<App />, {
            defaultState: {
                user: {
                    userName: "Test",
                    userId: 2222,
                    email: "test@gmail.com",
                },
                todos: null,
            },
        });

        // assert
        await waitFor(() => {
            expect(queryByText(/Login/i)).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText(/Todos/i)).toBeInTheDocument();
        });
    });
});
