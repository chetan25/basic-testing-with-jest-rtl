import React from "react";
import { List, ListItem, ListIcon, Alert, AlertIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import "app.scss";
import translator from "lang/translator";
import { useGlobalState, useGlobalStateDispatcher, Todos } from "store/global";

const ListTodos = () => {
    const state = useGlobalState();
    const dispatcher = useGlobalStateDispatcher();
    const { todos } = state;

    if (!todos || todos.length < 1) {
        return (
            <Alert status="warning">
                <AlertIcon />
                {translator("no_todos_to_dispaly")}
            </Alert>
        );
    }

    const handleTodoUpdate = (_: React.MouseEvent<SVGElement, MouseEvent>, todo: Todos) => {
        // update the server and then the global state
        const todoIndex = todos.findIndex((data) => data.todoId === todo.todoId);
        if (todoIndex < 0) {
            return;
        }
        // update the new todo in that index
        const updatedTodos = [...todos];
        todo.isCompleted = !todo.isCompleted;
        updatedTodos[todoIndex] = todo;

        dispatcher({
            ...state,
            todos: updatedTodos,
        });
    };

    return (
        <List spacing={3}>
            {todos.map((todo) => {
                return (
                    <ListItem key={todo.todoId}>
                        <ListIcon
                            data-testid={todo.todoId}
                            onClick={(e) => handleTodoUpdate(e, todo)}
                            as={MdCheckCircle}
                            color={todo.isCompleted ? "green.500" : "grey"}
                        />
                        <span>
                            {todo.title} --- {todo.description} ---{" "}
                            <span>{todo.isCompleted ? translator("completed") : translator("not_completed")}</span>
                        </span>
                    </ListItem>
                );
            })}
        </List>
    );
};
export default ListTodos;
