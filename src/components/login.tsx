import React from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Alert,
    AlertIcon,
    AlertDescription,
    CloseButton,
} from "@chakra-ui/react";
import useLogin from "hooks/useLogin";
import translator from "lang/translator";
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

const RenderAlert = (message: string) => {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertDescription data-testid={translator("login-error")}>{message}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    );
};
const Login = () => {
    const { email, error, onEmailChange, password, onPasswordChange, login, isFormInValid, isProcessing } = useLogin();

    console.log(error, "error");
    return (
        <form>
            <Heading as="h3" size="lg">
                {translator("login")}
            </Heading>
            <FormControl id={translator("email")} isRequired>
                <FormLabel> {translator("email")}</FormLabel>
                <Input placeholder={translator("email")} value={email} onChange={onEmailChange} />
            </FormControl>
            <FormControl id={translator("password")} isRequired>
                <FormLabel> {translator("password")}</FormLabel>
                <Input
                    placeholder={translator("password")}
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={login} disabled={isFormInValid()}>
                {translator("submit")}
            </Button>
            {error ? RenderAlert(error) : null}
            <LoadingMessage timeout={300} start={isProcessing}>
                <h4>{translator("loging_in_please_wait")}</h4>
            </LoadingMessage>
        </form>
    );
};

export default Login;
