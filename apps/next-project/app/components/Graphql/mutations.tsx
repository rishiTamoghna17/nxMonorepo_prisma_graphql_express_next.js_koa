import { gql,  } from '@apollo/client';

export const Create_Tasks = gql`
mutation CreateTask($title:String! ) {
    createTask(title:$title){
    id
    title
    isComplete
  }
}
`;

export const Update_Tasks = gql`
mutation UpdateTask ($id:Int!,$isComplete:Boolean){
  updateTask(id:$id,isComplete:$isComplete){
    id
    isComplete
    title
  }
}`;

export const Delete_Tasks = gql`
mutation DeleteTask($id:Int!){
  deleteTask(id:$id)
}`;