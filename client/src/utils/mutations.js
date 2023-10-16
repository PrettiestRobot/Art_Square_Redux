import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postName: String!, $imageUrl: String!, $userId: ID!) {
    addPost(postName: $postName, imageUrl: $imageUrl, userId: $userId) {
      _id
      postName
      postAuthor {
        _id
      }
      imageUrl
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $postId: ID!
    $commentText: String!
    $commentAuthor: ID!
    $username: String!
  ) {
    addComment(
      postId: $postId
      commentText: $commentText
      commentAuthor: $commentAuthor
      username: $username
    ) {
      _id
      postName
      postAuthor {
        _id
      }
      imageUrl
      createdAt
      comments {
        _id
        commentText
        createdAt
        username
        commentAuthor {
          _id
        }
      }
    }
  }
`;

export const ADD_RATING = gql`
  mutation addRating($postId: ID!, $rating: Int!, $ratingAuthor: ID!) {
    addRating(postId: $postId, rating: $rating, ratingAuthor: $ratingAuthor) {
      _id
      postName
      postAuthor {
        _id
        username
      }
      imageUrl
      createdAt
      ratings {
        _id
        rating
        ratingAuthor {
          _id
          username
        }
        createdAt
      }
    }
  }
`;

export const ADD_FOLLOW = gql`
  mutation AddFollow($userId: ID!, $followedId: ID!) {
    addFollow(userId: $userId, followedId: $followedId) {
      id
      followed {
        id
        username
      }
    }
  }
`;

export const REMOVE_FOLLOW = gql`
  mutation RemoveFollow($userId: ID!, $followedId: ID!) {
    removeFollowed(userId: $userId, followedId: $followedId) {
      id
      followed {
        id
        username
      }
    }
  }
`;
