import React, { useState } from "react";
import { StackDivider, VStack, Box, Button } from "@chakra-ui/react";
import "app.scss";
import translator from "lang/translator";
import ListTodos from "components/list-todos";
import AddModal from "./add-modal";

const DisplayTodos = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModalState = () => {
        setIsOpen((state) => !state);
    };
    return (
        <>
            <Box padding="10" data-testid={translator("display_todos")}>
                <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                    <Box>
                        <Button colorScheme="teal" variant="solid" onClick={toggleModalState}>
                            Add New Todo
                        </Button>
                        {isOpen ? <AddModal isOpen={isOpen} onClose={toggleModalState} /> : null}
                    </Box>
                    <Box>
                        <ListTodos />
                    </Box>
                </VStack>
            </Box>
        </>
    );
};

export default DisplayTodos;

// const OpenModal = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleModalState = () => {
//         setIsOpen((state) => !state);
//     };
//     return (
//         <>
//             <Button colorScheme="teal" variant="solid" onClick={toggleModalState}>
//                 Add New Todo
//             </Button>
//             {isOpen ? <AddModal isOpen={isOpen} onClose={toggleModalState} /> : null}
//         </>
//     );
// };

// const DisplayTodosV2 = (props: React.PropsWithChildren<any>) => {
//     return (
//         <Box padding="10" data-testid={translator("display_todos")}>
//             <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
//                 <Box>
//                     <Button colorScheme="teal" variant="solid">
//                         Add Todo
//                     </Button>
//                 </Box>
//                 <Box>{props.children}</Box>
//             </VStack>
//         </Box>
//     );
// };

// export default DisplayTodosV2;
