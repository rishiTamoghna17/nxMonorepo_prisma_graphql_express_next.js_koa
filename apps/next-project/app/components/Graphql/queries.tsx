import { gql,  } from '@apollo/client';

export const Get_tasks = gql`
  query {
    tasks {
      id
      title
      isComplete
    }
  }
`;
