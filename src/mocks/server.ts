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
    todos: typeof TodoFactory;
};

type AppModels = {
    user: typeof UserModel;
    todos: typeof TodosModel;
};

type AppRegistry = Registry<AppModels, AppFactory>;
type AppSchema = Schema<AppRegistry>;

const startServer = () => {
    return createServer<AppModels, AppFactory>({
        serializers: {
            application: JSONAPISerializer,
        },
        models: {
            user: Model,
            todos: Model,
        },
        factories: {
            user: UserFactory,
            todos: TodoFactory,
        },
        seeds(server) {
            server.create("user", {
                userId: Math.floor(Math.random() * 10),
                userName: "Test",
                email: "test@gmail.com",
                password: "test1234",
            });
        },
        routes() {
            this.namespace = "api";

            //  login
            this.post("/login", (schema: AppSchema, request) => {
                const { email, password } = JSON.parse(request.requestBody);

                const user = schema.db.users.where({ email: email, password: password });
                if (user.length < 1) {
                    return new Response(404, {}, { errors: ["Email or Password incorrect"] });
                }
                return new Response(200, {}, { user: user });
            });
            //   this.get("/todos", () => {
            //     return {
            //       movies: [
            //         { id: 1, name: "Inception", year: 2010 },
            //         { id: 2, name: "Interstellar", year: 2014 },
            //         { id: 3, name: "Dunkirk", year: 2017 },
            //       ],
            //     }
            //   })
        },
    });
};

export default startServer;
