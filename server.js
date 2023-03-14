const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PORT } = require("./config");
const userMutations = require('./graphql/mutations/userMutation');
const userQuery = require('./graphql/queries/userQuery');
const {GraphQLObjectType, GraphQLSchema} = require('graphql');
// const pg = require("pg");
require("./db");

// const schema = buildSchema(`
// type Query {
//     message: String
// }
// `);

// const root = {
//   message: () => "Hello World!",
// };


const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
      ...userQuery
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
      ...userMutations
  })
})



const app = express();
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
        query: Query,
        mutation: Mutation
    })
})
);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
