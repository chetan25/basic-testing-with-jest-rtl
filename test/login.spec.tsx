import React from "react";
import { renderWithProviders, waitFor } from "utils/render";
import user from "@testing-library/user-event";
import Login from "components/login";
import translator from "src/lang/translator";
import startServer from "mocks/server";

let server: any;

beforeEach(() => {
    server = startServer();
});

afterEach(() => {
    server.shutdown();
});
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
        expect(passwordEl).toHaveAttribute("type", "password");
        expect(getByText(translator("submit"))).toBeInTheDocument();
        expect(getByText(translator("submit"))).toHaveAttribute("disabled");
    });

    it("Test the loading text shows up on submitting", async () => {
        // arrange
        const { getByPlaceholderText, queryByText, getByText } = renderWithProviders(<Login />);
        // get input elements
        const emailEl = getByPlaceholderText(translator("email"));
        const passwordEl = getByPlaceholderText(translator("password"));

        // act
        user.type(emailEl, "test@gmail.com");
        user.type(passwordEl, "test1234");
        user.click(getByText(translator("submit")));

        // assert
        expect(queryByText(translator("loging_in_please_wait"))).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByText(translator("loging_in_please_wait"))).not.toBeInTheDocument();
        });
    });
    it("Test Alert shows up on wrong credentials", async () => {
        // arrange
        const { getByPlaceholderText, queryByText, getByText, queryByTestId } = renderWithProviders(<Login />);
        // get input elements
        const emailEl = getByPlaceholderText(translator("email"));
        const passwordEl = getByPlaceholderText(translator("password"));

        // act
        user.type(emailEl, "wromng@gmail.com");
        user.type(passwordEl, "wromng");
        user.click(getByText(translator("submit")));

        // assert
        expect(queryByText(translator("loging_in_please_wait"))).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByText(translator("loging_in_please_wait"))).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(queryByTestId(translator("login_error"))).toBeInTheDocument();
        });
    });
});
