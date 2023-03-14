const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
  } = require('graphql');
  
  const { UserType } = require('../types/userType');
  const { User } = require('../../models/userModel');
  
  const userQuery = {
    type: new GraphQLList(UserType),
    args: {
      id: {
        name: 'id',
        type: GraphQLInt,
      },
      username: {
        name: 'username',
        type: GraphQLString,
      },
      email: {
        name: 'email',
        type: GraphQLString,
      },
      firstName:{
        name:'firstName',
        type:GraphQLString,
      },
      lastName:{
        name:'lastName',
        type:GraphQLString,
      },
      password:{
        name:'password',
        type:GraphQLString,
      },
      createdAt: {
        name: 'createdAt',
        type: GraphQLString,
      },
      updatedAt: {
        name: 'updatedAt',
        type: GraphQLString,
      },
    },
    resolve: (user, args) => User.findAll({ where: user })
  };
  
  module.exports = { userQuery };
  