import React from "react";
import "app.scss";
import { Todos } from "store/global";
import translator from "lang/translator";

const DisplayTodos = ({ todos = [] }: { todos: Todos[] }) => {
    return (
        <div data-testid={translator("display-todos")}>
            {todos.map((todo) => {
                return (
                    <div key={todo.todoId}>
                        {todo.title} --- {todo.description}
                    </div>
                );
            })}
        </div>
    );
};
export default DisplayTodos;
