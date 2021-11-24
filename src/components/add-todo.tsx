import React from "react";
import "app.scss";
// import { useGlobalState, useGlobalStateDispatcher } from "store/global";
import translator from "lang/translator";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Checkbox,
    // Alert,
    // AlertIcon,
    // AlertDescription,
} from "@chakra-ui/react";
import useAddTodo from "hooks/addTodo";

const AddTodo = () => {
    // const state = useGlobalState();
    // const dispatcher = useGlobalStateDispatcher();

    const { todo, addTodo, handleChange, isFormInValid } = useAddTodo();

    return (
        <form>
            <Heading as="h3" size="lg">
                {translator("add_todo")}
            </Heading>
            <FormControl id={translator("title")} isRequired>
                <FormLabel> {translator("title")}</FormLabel>
                <Input placeholder={translator("title")} name="title" value={todo.title} onChange={handleChange} />
            </FormControl>
            <FormControl id={translator("description")} isRequired>
                <FormLabel> {translator("description")}</FormLabel>
                <Input
                    placeholder={translator("description")}
                    value={todo.description}
                    name="description"
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id={translator("status")}>
                <FormLabel>{translator("status")}</FormLabel>
                <Checkbox
                    id={translator("status")}
                    name="isCompleted"
                    onChange={handleChange}
                    colorScheme={todo.isCompleted ? "green" : ""}
                    isChecked={todo.isCompleted}
                >
                    {todo.isCompleted ? translator("completed") : translator("not_completed")}
                </Checkbox>
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={addTodo} disabled={isFormInValid()}>
                {translator("submit")}
            </Button>
        </form>
    );
};
export default AddTodo;
