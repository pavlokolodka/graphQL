const express = require('express');
const { graphqlHTTP } = require("express-graphql")
const { buildSchema, GraphQLObjectType, GraphQLSchema } = require("graphql")
const PORT = 4000;
const app = express()
const productQuery = require('./schema/product.query')


const schema = new GraphQLSchema({
    query: productQuery,
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)
app.listen(PORT, () => console.log("Running a GraphQL API server at http://localhost:4000/graphql"))
