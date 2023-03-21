const { createReadStream } = require("fs");
// const { join } = require("path");
// const graphqlUploadExpress = require("graphql-upload");

// const storeUpload = async ({ stream, filename }) => {
//   const uploadDir = "../../public/uploads";
//   const path = join(uploadDir, filename);
//   return new Promise((resolve, reject) =>
//     stream
//       .pipe(createWriteStream(path))
//       .on("finish", () => resolve({ path }))
//       .on("error", reject)
//   );
// };

// const processUpload = async (upload) => {
//   const { createReadStream, filename, mimetype } = await upload;
//   const stream = createReadStream();
//   const { path } = await storeUpload({ stream, filename });
//   return { filename, mimetype, path };
// };

// module.exports = {
//   upload: graphqlUploadExpress,
//   ImageMutation: {
//     uploadFile: async (_, { file }) => {
//       const result = await processUpload(file);
//       const newFile = await File.create(result);
//       return newFile;
//     },
//   },
// };

const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");

const ImageUpload = new GraphQLSchema({
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
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
          return stream;
        },
      },
    },
  }),
});
console.log(ImageUpload);
const { filename, mimetype } = ImageUpload;
module.exports = { filename, mimetype };
