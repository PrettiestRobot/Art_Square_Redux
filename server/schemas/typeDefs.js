const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
  }

  type Post {
    _id: ID
    postName: String
    postAuthor: User!
    imageUrl: String
    createdAt: String
    ratings: [Rating]!
    comments: [Comment]!
    averageRating: Float
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: User!
    createdAt: String
    username: String
  }

  type Rating {
    _id: ID
    rating: Int
    ratingAuthor: User!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    userById(id: ID!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    ratings(postId: ID!): [Rating]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postName: String! imageUrl: String! userId: ID!): Post
    addComment(
      postId: ID!
      commentText: String!
      commentAuthor: ID!
      username: String!
    ): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addRating(postId: ID!, rating: Int!, ratingAuthor: ID!): Post
  }
`;

module.exports = typeDefs;
