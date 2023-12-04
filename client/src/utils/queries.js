import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profilePicture
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
      profilePicture
      posts {
        _id
        postName
        imageUrl
        createdAt
        averageRating
      }
      followed {
        _id
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
        profilePicture
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
        profilePicture
      }
      imageUrl
      createdAt
      averageRating
      tags
      comments {
        _id
        commentText
        createdAt
        commentAuthor {
          _id
          username
          profilePicture
        }
        username
      }
    }
  }
`;

export const IS_USER_FOLLOWED = gql`
  query IsUserFollowed($userId: ID!, $followedId: ID!) {
    isUserFollowed(userId: $userId, followedId: $followedId)
  }
`;

export const QUERY_FOLLOWED_USERS = gql`
  query GetFollowedUsers($ids: [ID!]!) {
    followedUsers(ids: $ids) {
      _id
      username
      profilePicture
      posts {
        averageRating
      }
    }
  }
`;
