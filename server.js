const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PORT } = require("./config");
const {userMutations,addressMutations} = require("./graphql/mutations");
const userQuery = require("./graphql/queries/userQuery");
const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const cors = require("cors");
const passport = require('passport')
// const pg = require("pg");
require("./db");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...userMutations,
    // ...addressMutations
  }),
});

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(
  "/graphql",

  graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
      query: Query,
      mutation: Mutation,
    }),
  })
);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
