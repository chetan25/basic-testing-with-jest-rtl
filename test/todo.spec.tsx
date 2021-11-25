import React from "react";
import { renderWithProviders, waitFor } from "utils/render";
import Todos from "components/todos";
import startServer, { TODO_DEFAULT_DATA, DEFAULT_USER } from "mocks/server";

// mock the dispkay and add todo component
jest.mock("components/add-todo", () => ({
    __esModule: true,
    default: () => {
        return <h2>Add Todo</h2>;
    },
}));

jest.mock("components/dispaly-todo", () => ({
    __esModule: true,
    default: () => {
        return <h2>Display Todos</h2>;
    },
}));

let server: any;

afterEach(() => {
    server.shutdown();
});

describe("Test Todos Component", () => {
    it("It should show Loading state, when fetching todo from server", async () => {
        // arrange
        server = startServer(TODO_DEFAULT_DATA, 500);

        const { queryByText, getByText } = renderWithProviders(<Todos />);

        // assert
        expect(getByText(/Loading/i)).toBeInTheDocument();
        // should disappear after the data is fetched
        await waitFor(() => {
            expect(queryByText(/Loading/i)).not.toBeInTheDocument();
        });
    });

    it("It should show Add Todo, when there is no todo present", async () => {
        // arrange
        server = startServer();

        const { queryByText } = renderWithProviders(<Todos />);

        // assert
        await waitFor(() => {
            expect(queryByText(/Add Todo/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(queryByText(/Dispaly Todos/i)).not.toBeInTheDocument();
        });
    });

    it("It should show Dispaly Todo, when there is todos present", async () => {
        // arrange
        server = startServer(TODO_DEFAULT_DATA);

        const { queryByText } = renderWithProviders(<Todos />, {
            defaultState: { user: DEFAULT_USER, todos: null },
        });

        // assert
        await waitFor(() => {
            expect(queryByText(/Display Todos/i)).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByText(/Add Todo/i)).not.toBeInTheDocument();
        });
    });
});
