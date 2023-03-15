const { AddressType } = require('../types/AddressType');
const { Address } = require('../../models');
const { UserInputType } =  require('../inputTypes/UserInputTypes');
const {GraphQLNonNull,GraphQLString, GraphQLInt} = require('graphql')


const userAddress ={
    type: AddressType,
    args: {
      id:{type:GraphQLInt},
      pin_code:{type:GraphQLNonNull(GraphQLInt)},
       city : { type: GraphQLString },
       state: { type: GraphQLNonNull(GraphQLString)},
       phone_no: { type: GraphQLString },
       
    },
    resolve: async (parent, args, context, info) => {
    //  const {pin_code,city,state,phone_no} = args;
     const address = await Address.create(args);
    return address;
    }
  }





module.exports = {userAddress}