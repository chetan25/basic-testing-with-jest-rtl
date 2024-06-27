import React, { useEffect } from "react";
import "app.scss";
import styles from "app.module.css";
import { useGlobalState, useGlobalStateDispatcher } from "store/global";
import translator from "lang/translator";
import DisplayTodos from "components/dispaly-todo";
import AddTodo from "components/add-todo";
// import ListTodos from "components/list-todos";

const Todos = () => {
    const state = useGlobalState();
    const dispatcher = useGlobalStateDispatcher();
    const { todos, user } = state;

    useEffect(() => {
        const loadTodos = async () => {
            const response = await fetch(`/api/todo/${user?.userId}`);
            const data = await response.json();
            dispatcher({
                ...state,
                todos: data.todos,
            });
        };
        loadTodos();
    }, []);

    if (!todos) {
        return <h4>Loading</h4>;
    }

    return (
        <div data-testid={translator("greeting")} className={styles.text}>
            {todos.length > 0 ? <DisplayTodos /> : <AddTodo />}
        </div>
    );
};
export default Todos;
