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

    type Product {
        id: ID
        name: String
        stock: Int
        price: Float
        created: String
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

    input ProductInput {
        name: String!
        stock: Int!
        price: Float!
    }

    type Query {
        getUser(token: String): User
        getProducts: [Product]
        getProduct(id: ID!): Product
    }

    type Mutation {
        # Users
        newUser(userInput: UserInput): User
        autenticateUser(input: AutenticateInput): Token

        # Products
        newProduct(productInput: ProductInput): Product
        updateProduct(id: ID!, productInput: ProductInput): Product
        deleteProduct(id: ID!): String
    }
`;

module.exports = typeDefs;