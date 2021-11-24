import React, { useState } from "react";
import { useGlobalState, useGlobalStateDispatcher } from "store/global";

const useLogin = () => {
    const state = useGlobalState();
    const dispatcher = useGlobalStateDispatcher();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async () => {
        setError(null);
        setProcessing(true);
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const result = await res.json();
        setProcessing(false);

        if (result.user) {
            dispatcher({
                ...state,
                user: result.user[0],
            });
        } else {
            setError(result.errors[0]);
        }
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const isFormInValid = () => {
        if (email.length < 5 || password.length < 5) {
            return true;
        }

        return false;
    };

    return {
        email,
        onEmailChange,
        password,
        onPasswordChange,
        login,
        isFormInValid,
        isProcessing,
        error,
    };
};

export default useLogin;
