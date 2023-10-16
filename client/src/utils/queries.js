import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postName
        imageUrl
        createdAt
      }
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query userById($id: ID!) {
    userById(id: $id) {
      _id
      username
      email
      posts {
        _id
        postName
        imageUrl
        createdAt
        averageRating
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postName
      postAuthor {
        _id
        username
      }
      imageUrl
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postName
      postAuthor {
        _id
        username
      }
      imageUrl
      createdAt
      averageRating
      comments {
        _id
        commentText
        createdAt
        commentAuthor {
          _id
        }
        username
      }
    }
  }
`;
