import React from "react";
import { CSSTransition } from "react-transition-group";

const LoadingMessage = ({
    timeout,
    children,
    start = false,
}: {
    timeout: number;
    children: React.ReactNode;
    start: boolean;
}) => {
    return (
        <CSSTransition unmountOnExit timeout={timeout} classNames="loading" in={start}>
            {children}
        </CSSTransition>
    );
};

export default LoadingMessage;
