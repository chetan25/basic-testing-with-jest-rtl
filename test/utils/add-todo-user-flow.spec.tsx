import React from "react";
import { renderWithProviders, waitFor } from "utils/render";
import Todos from "components/todos";
import startServer, { DEFAULT_USER } from "mocks/server";
import translator from "lang/translator";
import user from "@testing-library/user-event";

jest.mock("components/loading-component", () => ({
    __esModule: true,
    default: ({ start }: { start: boolean }) => {
        return start ? <h2>Adding Todo</h2> : null;
    },
}));

let server: any;

afterEach(() => {
    server.shutdown();
});

describe("Test Add Todo User Work flow", () => {
    it("User should be able to add todo and see it on screen", async () => {
        // arrange
        server = startServer(null, 500);
        server = startServer(null, 400);
        const { findByPlaceholderText, findByTestId, queryByText, findByLabelText } = renderWithProviders(<Todos />, {
            defaultState: {
                user: DEFAULT_USER,
                todos: null,
            },
        });

        const titleEl = await findByPlaceholderText(translator("title"));
        const descriptionEl = await findByPlaceholderText(translator("description"));
        const isCompletedEl = await findByLabelText(translator("status"));
        const btnEl = await findByTestId(translator("submit"));

        // act
        user.type(titleEl, "First Todo");
        user.type(descriptionEl, "First Todo Description");
        user.click(isCompletedEl);
        user.click(btnEl);

        // assert
        expect(queryByText(/Adding Todo/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByText(/Adding Todo/i)).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(queryByText(/First Todo/i)).toBeInTheDocument();
        });
    });
});
