const merge = require("lodash.merge");
const { UserType } = require("../types/userType");
const { User, Otp } = require("../../models");
const { UserInputType } = require("../inputTypes/UserInputTypes");
const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const otpGenerator = require("otp-generator");
const { otpEmail } = require("../../services/otpVerify");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");
const JwtService = require("../../services/jwtService");

const registerUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    username: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    const { email, firstName, username, password, confirm_password } = args;
    const data = await User.findOne({ where: { email } });
    if (data) throw new Error("email already exists");
    const userName = await User.findOne({ where: { username } });
    if (userName) throw new Error("username already exists");
    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailExpression.test(String(email).toLowerCase());
    if (!isValidEmail) throw new Error("email not in proper format");
    if (password !== confirm_password)
      throw new Error("password does not match");
    if (firstName.length > 15)
      throw new Error("firstName should be less than 15 characters");

    if (password.length < 6)
      throw new Error("password should be minimum 6 characters");
    args.password = bcrypt.hashSync(args.password, 10);
    const user = await User.create(args);
    const access_token = JwtService.sign({ _id: user.id });
    console.log(access_token);
    return user;
  },
};

const ForgetPassword = {
  type: UserType,
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, context, info) => {
    const { email } = args;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("invalid email");
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const hashedOtp = await bcrypt.hash(otp, 10);
    const emailExists = await Otp.findOne({ email });
    if (emailExists) {
      const updateOtp = await Otp.update(
        { otp: hashedOtp },
        { where: { email: email } }
      );
    } else {
      const otpSave = new Otp({ otp: hashedOtp, email });
      await otpSave.save();
    }
    otpEmail(otp, email);
    return user;
  },
};

const otpVerification = {
  type: UserType,
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    otp: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    confirm_password: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    const { otp, email, password, confirm_password } = args;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("invalid email");
    const userExist = await Otp.findOne({ email });
    const otpVerify = await bcrypt.compare(otp, userExist.otp);
    if (!otpVerify) {
      throw new Error("invalid otp");
    }
    if (password !== confirm_password)
      throw new Error("password and confirm password does not match");
    const hashedPassword = bcrypt.hashSync(password, 10);
     await User.update(
      { password: hashedPassword },
      { where: { email: email } }
    );

    return user;
  },
};

const updateUser = {
  type: UserType,
  description: "The mutation that allows you to update an existing User by Id",
  args: {
    user: {
      name: "user",
      type: UserInputType("update"),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id);
    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }

    const updatedUser = merge(foundUser, {
      username: user.username,
      email: user.email,
    });

    return foundUser.update(updatedUser);
  },
};

const deleteUser = {
  type: UserType,
  description: "The mutation that allows you to delete a existing User by Id",
  args: {
    user: {
      name: "user",
      type: UserInputType("delete"),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id);

    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }

    await User.destroy({
      where: {
        id: user.id,
      },
    });

    return foundUser;
  },
};

module.exports = {
  updateUser,
  deleteUser,
  registerUser,
  ForgetPassword,
  otpVerification,
};
