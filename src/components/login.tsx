import React from "react";
import { FormControl, FormLabel, Input, Button, Heading, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import useLogin from "hooks/useLogin";
import translator from "lang/translator";
import LoadingMessage from "components/loading-component";

const RenderAlert = (message: string) => {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertDescription data-testid={translator("login_error")}>{message}</AlertDescription>
        </Alert>
    );
};

const Login = () => {
    const { email, error, onEmailChange, password, onPasswordChange, login, isFormInValid, isProcessing } = useLogin();

    const loadingText = translator("loging_in_please_wait");

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
            <div>
                <LoadingMessage timeout={300} start={isProcessing}>
                    <h4>{loadingText}</h4>
                </LoadingMessage>
            </div>
        </form>
    );
};

export default Login;
