import React from "react";
import { renderWithProviders } from "utils/render";
import Header from "components/header";
import translator from "lang/translator";

// jest.mock("lang/translator", () => {
//     return  (key : string, options: Record<any, any>) => {
//          return options.userName ? `Header ${options.userName}` : 'Header'
//     }
// });

describe("Test Header Component", () => {
    it("Test Header without user", () => {
        // arrange
        const { getByText } = renderWithProviders(<Header />);

        // assert
        expect(getByText(translator("let_start_your_testing_journey"))).toBeInTheDocument();
    });

    it("Test Header without user", () => {
        // arrange
        const user = {
            userId: 1,
            userName: "Bond",
            email: "bond@world.com",
        };
        const { getByText } = renderWithProviders(<Header />, {
            defaultState: {
                user: user,
                todos: null,
            },
        });

        // assert
        expect(
            getByText(
                translator("welcome_[userName]_to_testing_world", {
                    userName: user.userName,
                })
            )
        ).toBeInTheDocument();
    });
});
