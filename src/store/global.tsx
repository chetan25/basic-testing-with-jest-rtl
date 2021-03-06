import React, { useState, useContext, createContext } from "react";

export type User = { userId: number; userName: string; email: string } | null;

export type Todos = {
    userId: number;
    todoId: number;
    title: string;
    description: string;
    isCompleted: boolean;
};

export type AddTodoType = Omit<Todos, "userId" | "todoId">;
export type GlobalState = {
    user: User | null;
    todos: Todos[] | null;
};

export type StateUpdator = (value: GlobalState) => void;

// {
//     userId: 1,
//     userName: "Test",
//     email: "test@gmail.com",
//     password: "test1234",
// }
export const initialState = {
    user: null,
    todos: null,
};

const GlobalContext = createContext<[GlobalState, StateUpdator] | undefined>(undefined);

export const GlobalProvider = ({
    children,
    defaultValue = initialState,
}: {
    children: React.ReactNode;
    defaultValue?: GlobalState;
}) => {
    const [state, setState] = useState<GlobalState>(defaultValue);

    return <GlobalContext.Provider value={[state, setState]}>{children}</GlobalContext.Provider>;
};

export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("Please use `useGlobalState` inside a GlobalProvider");
    }

    const [state] = context;
    return state;
};

export const useGlobalStateDispatcher = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("Please use `useGlobalState` inside a GlobalProvider");
    }

    const [_, dispatcher] = context;
    return dispatcher;
};
