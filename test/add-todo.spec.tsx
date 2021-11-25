import React from "react";
import { renderWithProviders, waitFor } from "utils/render";
import startServer from "mocks/server";
import AddTodo from "components/add-todo";
import { DEFAULT_TODO_VALUE } from "hooks/addTodo";
import translator from "lang/translator";
import user from "@testing-library/user-event";

jest.mock("components/loading-component", () => ({
    __esModule: true,
    default: ({ start }: { start: boolean }) => {
        return start ? <h2>Adding Todo</h2> : null;
    },
}));

let server: any;

// beforeEach(() => {});

afterEach(() => {
    server.shutdown();
});

describe("Test Add Todo Component", () => {
    it("Should show all the form input with default values", () => {
        // arrange
        server = startServer();
        const { getByText, getByPlaceholderText, getByLabelText } = renderWithProviders(<AddTodo />);

        // assert
        expect(getByText(translator("add_todo"))).toBeInTheDocument();
        expect(getByPlaceholderText(translator("title"))).toHaveValue(DEFAULT_TODO_VALUE.title);
        expect(getByPlaceholderText(translator("description"))).toHaveValue(DEFAULT_TODO_VALUE.description);
        expect(getByLabelText(translator("status"))).not.toBeChecked();
        expect(getByText(translator("not_completed"))).toBeInTheDocument();
        expect(getByText(translator("submit"))).toHaveAttribute("disabled");
    });

    it("SHould be able to add Todo", async () => {
        // arrange
        server = startServer(null, 400);
        const { getByLabelText, getByPlaceholderText, getByText, queryByText } = renderWithProviders(<AddTodo />);

        const titleEl = getByPlaceholderText(translator("title"));
        const descriptionEl = getByPlaceholderText(translator("description"));
        const isCompletedEl = getByLabelText(translator("status"));
        const btnEl = getByText(translator("submit"));

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
    });
});
