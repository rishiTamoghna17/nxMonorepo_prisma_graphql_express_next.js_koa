import { gql,  } from '@apollo/client';

export const Create_Tasks = gql`
mutation CreateTask($title:String! ) {
    createTask(title:$title){
    id
    title
    isComplete
  }
}
`