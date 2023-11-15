const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

authMiddleware = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  signToken: function ({ email, username, _id, profilePicture }) {
    const payload = { email, username, _id, profilePicture };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

module.exports = authMiddleware;
