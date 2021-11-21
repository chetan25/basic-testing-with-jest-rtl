const EngTranslations = {
    let_start_your_testing_journey: () => {
        return "Let start your testing journey";
    },
    "welcome_[userName]_to_testing_world": (data) => {
        const { userName } = data;
        return `Welcome ${userName} to testing world`;
    },
    login: () => {
        return "Login";
    },
    greeting: () => {
        return "Greeting";
    },
    email: () => "Email",
    password: () => "Password",
    submit: () => "Submit",
    loging_in_please_wait: () => {
        return "loging in, please wait.....";
    },
    "login-error": () => "login-error",
};

export default EngTranslations;
