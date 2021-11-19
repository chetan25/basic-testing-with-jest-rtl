import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            // styles for the `body`
            body: {
                // bg: "gray.400",
                color: "black",
            },
            h3: {
                padding: "1rem",
            },
            // styles for the `a`
            a: {
                color: "teal.500",
                _hover: {
                    textDecoration: "underline",
                },
            },
        },
    },
});

const StyleProvider = ({ children }: { children: React.ReactNode }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default StyleProvider;
