import React from "react";
import { renderWithProviders } from "utils/render";
import user from "@testing-library/user-event";
import Login from "components/login";
import translator from "src/lang/translator";

// why this work is that jest compiler will host
// all the mock to top of file after compiling to commonjs before running the code,
// so that even the deps which consumed are defined before
// but when running mocks are declared before the import.
jest.mock("react-transition-group", () => {
    return {
        CSSTransition: ({ in: start, children }: { in: boolean; children: React.ReactNode }) => {
            return start ? children : null;
        },
    };
});

// jest.mock("hooks/useLogin", () => {
//     return {
//         email: "",
//         onEmailChange: () => {
//             return;
//         },
//         password: "",
//         onPasswordChange: () => {
//             return;
//         },
//         login: () => {
//             return;
//         },
//         isFormInValid: jest.fn(),
//         isProcessing: jest.fn(),
//     };
// });

describe("Test Login Component", () => {
    it("Test default Login form state after Loading", () => {
        // arrange
        const { getByPlaceholderText, getByText } = renderWithProviders(<Login />);
        // get input elements
        const emailEl = getByPlaceholderText(translator("email"));
        const passwordEl = getByPlaceholderText(translator("password"));

        // assert

        expect(emailEl).toHaveValue("");
        expect(passwordEl).toHaveValue("");
        expect(getByText(translator("submit"))).toBeInTheDocument();
        expect(getByText(translator("submit"))).toHaveAttribute("disabled");
    });

    it("Test the loading text shows up on submitting", () => {
        // arrange
        const { getByPlaceholderText, queryByText, getByText } = renderWithProviders(<Login />);
        // get input elements
        const emailEl = getByPlaceholderText(translator("email"));
        const passwordEl = getByPlaceholderText(translator("password"));

        // act
        user.type(emailEl, "test@email.com");
        user.type(passwordEl, "worldwqwq");
        user.click(getByText(translator("submit")));

        // assert
        expect(queryByText(translator("loging_in_please_wait"))).toBeInTheDocument();
    });
});
