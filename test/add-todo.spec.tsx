import React from "react";
import { renderWithProviders } from "utils/render";
import startServer, { TODO_DEFAULT_DATA } from "mocks/server";
import AddTodo from "components/add-todo";
import { DEFAULT_TODO_VALUE } from "hooks/addTodo";
import translator from "lang/translator";

let server: any;

beforeEach(() => {
    server = startServer(TODO_DEFAULT_DATA);
});

afterEach(() => {
    server.shutdown();
});

describe("Test Add Todo Component", () => {
    it("Should show all the form input with default values", () => {
        // arrange
        const { getByText, getByPlaceholderText, getByLabelText } = renderWithProviders(<AddTodo />);

        // assert
        expect(getByText(translator("add_todo"))).toBeInTheDocument();
        expect(getByPlaceholderText(translator("title"))).toHaveValue(DEFAULT_TODO_VALUE.title);
        expect(getByPlaceholderText(translator("description"))).toHaveValue(DEFAULT_TODO_VALUE.description);
        expect(getByLabelText(translator("status"))).not.toBeChecked();
        expect(getByText(translator("not_completed"))).toBeInTheDocument();
        expect(getByText(translator("submit"))).toHaveAttribute("disabled");
    });
});
