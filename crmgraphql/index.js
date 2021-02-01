const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolves');

// Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        const miContext = {
            nombre: "jonnattan"
        };
        return{
            miContext
        }
    }
})
server.listen().then(({url}) => {
    console.log(`servidor listo en la url ${url}`);
})