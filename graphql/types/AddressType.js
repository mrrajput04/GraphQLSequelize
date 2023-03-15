const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
const {User} = require('../../models')

const AddressType = new GraphQLObjectType({
    name: "Address",
    // description: "This represents a Address",
    fields: () => ({
      id: {
        type: GraphQLInt,
        resolve: (address) => address.id,
      },
      state: {
        type: GraphQLString,
        resolve: (address) => address.state,
      },
      city: {
        type: GraphQLString,
        resolve: (address) => address.email,
      },
      pin_code: {
        type: GraphQLInt,
        resolve: (address) => address.pin_code,
      },
      phone_no: {
        type: GraphQLString,
        resolve: (address) => address.phone_no,
      },
      createdAt: {
        type: GraphQLString,
        resolve: (address) => address.createdAt,
      },
      updatedAt: {
        type: GraphQLString,
        resolve: (address) => address.updatedAt,
      },
    }),
  });
  
  module.exports = { AddressType };