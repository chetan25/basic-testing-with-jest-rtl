import React, { useState } from "react";
// import { useGlobalState, useGlobalStateDispatcher } from "store/global";

const useLogin = () => {
    // const state = useGlobalState();
    // const dispatcher = useGlobalStateDispatcher();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setProcessing] = useState(false);

    const login = () => {
        setProcessing(true);
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
    };
};

export default useLogin;
