import { gql } from '@apollo/client';

export const get_LoginUser = gql`
  query LoginUser {
    loginUser {
      id
      name
      email
      products {
        id
        title
        description
        price
        thumbsUp
      }
    }
  }
`;

export const allUsers = gql`
  query AllUsers {
    allUsers {
      id
      name
      email
      products {
        id
        title
        description
        price
      }
    }
  }
`;
export const All_Products = gql`
query GetAllProducts {
  getAllProducts {
    id
    title
    description
    price
    thumbsUp
    user {
      id
      name
      email
    }
  }
}`;

export const getUserById = gql`
  query GetUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      id
      name
      email
      password
      products {
        id
        title
        description
        price
        thumbsUp
      }
    }
  }
`;
