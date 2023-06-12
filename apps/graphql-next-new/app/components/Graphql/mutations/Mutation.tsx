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
