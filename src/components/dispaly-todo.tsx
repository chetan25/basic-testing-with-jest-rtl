import React from "react";
import { StackDivider, VStack, Box, Button } from "@chakra-ui/react";
import "app.scss";
import translator from "lang/translator";
import ListTodos from "components/list-todos";

const DisplayTodos = () => {
    return (
        <Box padding="10" data-testid={translator("display_todos")}>
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                <Box>
                    <Button colorScheme="teal" variant="solid">
                        Add Todo
                    </Button>
                </Box>
                <Box>
                    <ListTodos />
                </Box>
            </VStack>
        </Box>
    );
};
export default DisplayTodos;
