const {ApolloServer, gql} = require('apollo-server');
const {pool} = require("./dependes");
const fs = require("fs");
const path = require("path");

const filePathTypeDefs = path.join(__dirname, 'typeDefs.graphql');
// const typeDefs = fs.readFileSync(filePathTypeDefs, 'utf-8');

const todos = [
    {task: 'asd', completed: false},
    {task: 'assd', completed: true},
]

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
        getTodos: () => todos
    },
    Mutation: {
        addTodo: ((_, {task, completed}) => todos.push({task, completed}))
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(4500).then(({url}) => {
    console.log(`Server listenning ${url}`)
});