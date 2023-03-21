// const { GraphQLUpload } = require('graphql-upload');


// module.exports =  
// `type File {
//     id: ID!
//     filename: String!
//     mimetype: String!
//     path: String!
//   }
//   scalar Upload 
   
//   type Mutation {
//     uploadFile(file: Upload!): File!
//   }`;

const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLUpload } = require('graphql-upload');
 
const fileType = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    scalar Upload
  `,
  resolvers: {
    Upload: GraphQLUpload,
  },
});

module.exports = {fileType}