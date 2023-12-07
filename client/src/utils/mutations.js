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
        commentAuthor {
          _id
          username
          profilePicture
        }
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
      _id
      followed {
        _id
      }
    }
  }
`;

export const ADD_TAG_TO_POST = gql`
  mutation AddTagToPost($postId: ID!, $tag: String!) {
    addTagToPost(postId: $postId, tag: $tag) {
      _id
      tags {
        _id
        tagName
      }
    }
  }
`;
export const REMOVE_FOLLOW = gql`
  mutation RemoveFollow($userId: ID!, $followedId: ID!) {
    removeFollow(userId: $userId, followedId: $followedId) {
      _id
      followed {
        _id
      }
    }
  }
`;

export const REMOVE_TAG_FROM_POST = gql`
  mutation RemoveTagFromPost($postId: ID!, $tagId: ID!) {
    removeTagFromPost(postId: $postId, tagId: $tagId) {
      _id
      tags {
        _id
        tagName
      }
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($userId: ID!, $newUsername: String!) {
    updateUsername(userId: $userId, newUsername: $newUsername) {
      _id
      username
    }
  }
`;

export const UPDATE_PROFILE_PICTURE = gql`
  mutation UpdateProfilePicture($userId: ID!, $newProfilePicture: String!) {
    updateProfilePicture(
      userId: $userId
      newProfilePicture: $newProfilePicture
    ) {
      _id
      profilePicture
    }
  }
`;
