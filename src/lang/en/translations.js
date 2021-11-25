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
    login_error: () => "login-error",
    add_todo: () => "Add Todo",
    title: () => "Title",
    description: () => "Description",
    status: () => "Status",
    completed: () => "Completed",
    not_completed: () => "Not Completed",
    display_todos: () => "Display Todos",
    no_todos_to_dispaly: () => "No Todos to display",
    adding_todo_please_wait: () => "Adding Todo, please wait",
};

export default EngTranslations;
