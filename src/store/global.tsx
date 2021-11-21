import React, { useState, useContext, createContext } from "react";

export type User = { userName: string } | null;

export type GlobalState = {
    user: User | null;
};

export type StateUpdator = (value: GlobalState) => void;

export const initialState = {
    user: null,
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
