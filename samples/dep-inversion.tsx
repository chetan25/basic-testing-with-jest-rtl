interface Props {
  // Dependency Injection
    userClient: UserClient;
}

const UserList: React.FC<Props> = ({ userClient }) => {
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        userClient.getAll().then((usersList) => setUsers(usersList));
    }, []);

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};


type User = {
   name: string
}

class UserClient {
    getAll(): Promise<User[]> {
        // ... get users fetching them from an API
    }
    ....other functions
}


// <UserList userClient={new UserClient()} />


// Dependency Inversion 


// interface IUserClient {
//   getAll(): Promise<User[]>;
// }

// class UserClient implements IUserClient {
//   getAll(): Promise<User[]> {
//     // ... get users
//   }
// }


// interface Props {
//   userClient: IUserClient;
// }

// const UserList: React.FC<Props> = ({ userClient }) => {
//   const [users, setUsers] = React.useState<User[]>([]);

//   React.useEffect(() => {
//    userClient.getAll().then((usersList) => setUsers(usersList));
//   }, []);

//   return (
//    <ul>
//     {users.map(user => (
//      <li key={user.id}>{user.name}</li>
//     ))}
//    </ul>
//   )
// }


// // to test 

// class FakeUserClient implements IUserClient {
//   getAll(): Promise<User[]> {
//     return Promise.resolve([{}, {} ]) // Array of users
//   }
// }

// test('Tests for UserClient component', () => {
//   render(<UserList userClient={new FakeUserClient()} />)
//   // Assertions
// });
