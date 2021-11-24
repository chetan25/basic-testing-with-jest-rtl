import React, { useState } from "react";
import { useGlobalState, Todos } from "store/global";

export type AddTodoType = Omit<Todos, "userId" | "todoId">;

export const DEFAULT_TODO_VALUE = {
    title: "",
    description: "",
    isCompleted: false,
};

const useAddTodo = () => {
    const state = useGlobalState();
    // const dispatcher = useGlobalStateDispatcher();

    const [todo, setTodo] = useState<AddTodoType>(DEFAULT_TODO_VALUE);

    const [isProcessing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addTodo = async () => {
        setError(null);
        setProcessing(true);
        const res = await fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify({
                todo: {
                    ...todo,
                    userId: state.user?.userId,
                },
            }),
        });
        const result = await res.json();
        console.log(result);
        setProcessing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {
            ...todo,
            [event.target.name]: event.target.name === "isCompleted" ? event.target.checked : event.target.value,
        };
        setTodo(newState);
    };

    const isFormInValid = () => {
        if (!todo || (todo && !todo.title)) {
            return true;
        }

        return false;
    };

    return {
        todo,
        addTodo,
        handleChange,
        isFormInValid,
        isProcessing,
        error,
    };
};

export default useAddTodo;
