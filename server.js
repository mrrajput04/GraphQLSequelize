const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PORT } = require("./config");
const { userMutations, addressMutations } = require("./graphql/mutations");
const userQuery = require("./graphql/queries/userQuery");
const { GraphQLObjectType, GraphQLSchema, GraphQLBoolean } = require("graphql");
const cors = require("cors");
const passport = require("passport");
const ImageUpload = require("./graphql/mutations/fileUpload");
const { GraphQLUpload } = require("graphql-upload");
const { createReadStream } = require("fs");
const { fileType } = require("./graphql/types/fileType");

require("./db");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQuery,
  },
});


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  type:fileType,
  fields: {
    ...userMutations,
    uploadImage: {
      description: "Uploads an image.",
      type: GraphQLBoolean,
      args: {
        image: {
          description: "Image file.",
          type: GraphQLUpload,
        },
      },
      
      async resolve(parent, { image }) {
        const { filename, mimetype, createReadStream } = await image;
        const stream = createReadStream();
        // Promisify the stream and store the file, then…
        return true;
      },
    },
  },
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
