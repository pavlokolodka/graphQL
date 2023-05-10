const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { createClient } = require('graphql-http');
const { GraphQLSchema } = require("graphql")
const PORT = 4000;
const app = express()
const productQuery = require('./schema/product.query')
const productMutation = require('./schema/product.mutation')

const schema = new GraphQLSchema({
    query: productQuery,
    mutation: productMutation,
})

app.use(
  "/graphql",
  createHandler({
    schema: schema
  })
)
const client = createClient({
  url: 'http://localhost:4000/graphql',
});

app.listen(PORT, () => console.log("Running a GraphQL API server at http://localhost:4000/graphql"))
