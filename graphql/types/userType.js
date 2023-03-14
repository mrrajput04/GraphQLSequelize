const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (user) => user.id,
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    firstName: {
      type: GraphQLString,
      resolve: (user) => user.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: (user) => user.lastName,
    },
    password:{
        type:GraphQLString,
        resolve:(user)=>user.password
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt,
    },
  }),
});

module.exports = { UserType };
