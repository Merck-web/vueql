const {ApolloServer, gql} = require('apollo-server');
const {pool} = require("./dependes");
const fs = require("fs");
const path = require("path");
const resolvers = require("./resolvers");

const filePathTypeDefs = path.join(__dirname, 'typeDefs.graphql');
const typeDefs = fs.readFileSync(filePathTypeDefs, 'utf-8');



const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(4500).then(({url}) => {
    console.log(`Server listenning ${url}`)
});