const {
    GraphQLInt,
    GraphQLString,  
  } = require('graphql');
  const bcrypt = require('bcrypt');
  const {SECRET_KEY} = require('../../config')
  const jwt = require('jsonwebtoken');
  const {jwtAuth} = require('../../services/passportJwt')
  
  const { UserType } = require('../types/userType');
  const { User } = require('../../models/userModel');
  
  const userQuery = {
    type: UserType,
    args: {
      id: {
        name: 'id',
        type: GraphQLInt,
      },
    },
    resolve: async ( parent,args) => {
     const user = await User.findOne({ where: args.id })
     return user
    }
  };

 

  const userLogin = {
    type: UserType,
    args: {
    username: {
      name: 'username',
      type: GraphQLString,
    },
    password:{
      name:'password',
      type:GraphQLString,
    }
  },
  resolve: async (parent, args, context, info) => {
    
    const tok = context.rawHeaders[1].split(" ")[1];
    jwtAuth(tok);
      const {username,password} = args;
      const user = await User.findOne({ where: { username } })
      if(!user)
      throw new Error("user not found")
     const check = await bcrypt.compare(password, user.password)
     if(!check)
     throw new Error("wrong password")
     const token = jwt.sign({ user_id:  username }, SECRET_KEY, {
      expiresIn: "2h",
    })
    
    return user; 
    } 
  }
  
  module.exports = { userQuery, userLogin};
  