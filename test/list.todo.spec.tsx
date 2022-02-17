import React from "react";
import { renderWithProviders } from "utils/render";
import ListTodos from "components/list-todos";
import { DEFAULT_USER, TODO_DEFAULT_DATA } from "mocks/server";
import translator from "lang/translator";
import user from "@testing-library/user-event";

describe("Test List Todos COmponent", () => {
    it("Should show alert for no todos", () => {
        // arrange
        const { queryByText } = renderWithProviders(<ListTodos />, {
            defaultState: {
                user: null,
                todos: null,
            },
        });

        // assert
        expect(queryByText(translator("no_todos_to_dispaly"))).toBeInTheDocument();
    });

    it("Should be able to toggle the isCompleted status", async () => {
        // arrange
        const { queryByText, findByTestId } = renderWithProviders(<ListTodos />, {
            defaultState: {
                user: DEFAULT_USER,
                todos: [TODO_DEFAULT_DATA],
            },
        });

        const isCompletedEl = await findByTestId(TODO_DEFAULT_DATA.todoId);

        // act
        user.click(isCompletedEl);

        // assert
        expect(queryByText(translator("no_todos_to_dispaly"))).not.toBeInTheDocument();
        expect(queryByText(translator("completed"))).toBeInTheDocument();
    });
});
