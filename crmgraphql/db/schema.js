const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
    type User {
        id: ID
        name: String
        lastName: String
        email: String
        created: String
    }

    type Token {
        token: String
    }

    input UserInput {
        name: String!
        lastName: String!
        email: String!
        password: String!
    }

    input AutenticateInput {
        email: String!
        password: String!
    }

    type Query {
        obtener: String
    }

    type Mutation {
        newUser(userInput: UserInput): User
        autenticateUser(input: AutenticateInput): Token
    }
`;

module.exports = typeDefs;