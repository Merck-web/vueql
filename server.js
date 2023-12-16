const {ApolloServer, gql} = require('apollo-server');
const {pool} = require("./dependes");

// Пример запросов
const getTodosFromDB = async () => {

    const client = await pool.connect();
    try {
        const query = `SELECT *
                       FROM todos`

        const result = await client.query(query);
        return result.rows;
    } finally {
        client.release();
    }
};

const addTodoToDB = async (task, completed) => {
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO todos(task, completed) VALUES($1, $2) RETURNING *', [task, completed]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const typeDefs = gql`
    type Todo {
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todo]
    }

    type Mutation {
        addTodo(task: String, completed: Boolean): Todo
    }
`;

const resolvers = {
    Query: {
        getTodos: async () => getTodosFromDB()
    },
    Mutation: {
        addTodo: async (_, {task, completed}) => await addTodoToDB(task, completed)
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen(4500).then(({url}) => {
    console.log(`Server listenning ${url}`)
});