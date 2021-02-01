const { ApolloServer } = require('apollo-server');
const typeDefs = require('./DB/Schema');
const resolvers = require('./DB/Resolves');
const connectDB = require('./Connect/DB');

// Conectar a db
connectDB()

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