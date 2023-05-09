const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema/products.typedefs')
const resolvers = require('./resolvers/products.resolver')

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
const bootstrap = (async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
      
    console.log(`🚀  Server ready at: ${url}`);
 })()
  