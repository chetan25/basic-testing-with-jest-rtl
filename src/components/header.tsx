import React from "react";
import { useGlobalState } from "store/global";
import { Box } from "@chakra-ui/react";
import translator from "lang/translator";
import { Heading } from "@chakra-ui/react";

const Header = () => {
    const { user } = useGlobalState();

    return (
        <Box w="100%" p={4} color="white">
            <Heading>
                {user && user.userName
                    ? translator("welcome_[userName]_to_testing_world", {
                          userName: user.userName,
                      })
                    : translator("let_start_your_testing_journey")}
            </Heading>
        </Box>
    );
};

// const HeaderContent = () => {
//     const { user } = useGlobalState();
//     return (
//         <>
//             {user && user.userName
//                 ? translator("welcome_[userName]_to_testing_world", {
//                       userName: user.userName,
//                   })
//                 : translator("let_start_your_testing_journey")}
//         </>
//     );
// };

export default Header;
