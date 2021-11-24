/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createServer, Model, Factory, JSONAPISerializer, Registry, Response } from "miragejs";
import Schema from "miragejs/orm/schema";
import { ModelDefinition } from "miragejs/-types";

type User = {
    userId: number;
    userName: string;
    email: string;
    password: string;
};

type Todos = {
    userId: number;
    todoId: number;
    title: string;
    description: string;
    isCompleted: boolean;
};

const UserModel: ModelDefinition<User> = Model.extend({});
const TodosModel: ModelDefinition<Todos> = Model.extend({});

const UserFactory = Factory.extend({
    userId() {
        return 99999;
    },
    userName() {
        return "";
    },
    email() {
        return "";
    },
    password() {
        return "";
    },
});

const TodoFactory = Factory.extend({
    userId() {
        return 99999;
    },
    todoId() {
        return 99999;
    },
    title(i) {
        return `Todso ${i}`; // Todso 1, Todsos 2, etc.
    },
    description() {
        return "Test Description for Todo";
    },
    isCompleted: false,
});

type AppFactory = {
    user: typeof UserFactory;
    todo: typeof TodoFactory;
};

type AppModels = {
    user: typeof UserModel;
    todo: typeof TodosModel;
};

type AppRegistry = Registry<AppModels, AppFactory>;
type AppSchema = Schema<AppRegistry>;

export const TODO_DEFAULT_DATA = {
    userId: Math.floor(Math.random() * 10),
    todoId: Math.floor(Math.random() * 10),
    title: "test",
    description: "this is test",
    isCompleted: false,
};

const startServer = (todosInitialData?: Todos, delay?: number) => {
    return createServer<AppModels, AppFactory>({
        serializers: {
            application: JSONAPISerializer,
        },
        models: {
            user: Model,
            todo: Model,
        },
        factories: {
            user: UserFactory,
            todo: TodoFactory,
        },
        seeds(server) {
            server.create("user", {
                userId: Math.floor(Math.random() * 10),
                userName: "Test",
                email: "test@gmail.com",
                password: "test1234",
            });
            if (todosInitialData) {
                server.create("todo", todosInitialData);
            }
        },
        routes() {
            this.namespace = "api";

            if (delay) {
                // default is 400 for development and 0 for testing
                this.timing = delay; // in milisecons
            }
            //  login
            this.post("/login", (schema: AppSchema, request) => {
                const { email, password } = JSON.parse(request.requestBody);

                const user = schema.db.users.where({ email: email, password: password });
                if (user.length < 1) {
                    return new Response(404, {}, { errors: ["Email or Password incorrect"] });
                }
                return new Response(200, {}, { user: user });
            });

            this.post("/todo", (schema: AppSchema, request) => {
                const { todo } = JSON.parse(request.requestBody);
                // @ts-ignore
                const allTodos = schema.todos.all();

                const addedTodo = schema.db.todos.insert({
                    ...todo,
                    todoId: allTodos.length + 1,
                });
                return new Response(200, {}, { todo: addedTodo });
            });

            this.get("/todo", () => {
                return {
                    todos: this.schema.db.todos,
                };
            });
        },
    });
};

export default startServer;
