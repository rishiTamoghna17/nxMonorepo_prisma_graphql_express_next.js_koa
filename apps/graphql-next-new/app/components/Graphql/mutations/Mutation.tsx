import { gql } from '@apollo/client';

export const create_User = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const Log_In = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      name
      email
    }
  }
`;

export const Create_Product = gql`
  mutation CreateProduct(
    $title: String!
    $description: String!
    $price: String!
    $thumbsUp: Boolean!
    $userId: ID
  ) {
    createProduct(
      title: $title
      description: $description
      price: $price
      thumbsUp: $thumbsUp
      userId: $userId
    ) {
      id
      title
      description
      price
      thumbsUp
      user {
        id
        name
      }
    }
  }
`;
