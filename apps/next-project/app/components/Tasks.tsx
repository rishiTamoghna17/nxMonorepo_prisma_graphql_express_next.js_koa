'use client';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import './task.css';
import { Get_tasks } from './Graphql/queries';
import { Update_Tasks, Delete_Tasks } from './Graphql/mutations';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface UpdateTaskVariables {
  id: number;
  isComplete: boolean;
}

interface DeleteTaskVariables {
  id: number;
}

export default function TodoList(): JSX.Element {
  const { data, loading, refetch } = useQuery<{ tasks: Task[] }>(Get_tasks, {
    fetchPolicy: 'no-cache',
  });

  const [updateTask] = useMutation<void, UpdateTaskVariables>(Update_Tasks);
  const [deleteTask] = useMutation<void, DeleteTaskVariables>(Delete_Tasks);

  const handleTaskUpdate = (id: number, isComplete: boolean): void => {
    updateTask({
      variables: { id, isComplete },
    })
      .then(() => {
        // Task update successful
        refetch(); // Refetch the tasks to update the UI
      })
      .catch((error:Error) => {
        console.error('Error updating task:', error);
      });
  };

  const handleTaskDelete = (id: number): void => {
    deleteTask({
      variables: { id },
    })
      .then(() => {
        // Task deletion successful
        refetch(); // Refetch the tasks to update the UI
      })
      .catch((error:Error) => {
        console.error('Error deleting task:', error);
      });
  };

  if (loading) return <p>loading ...</p>;

  return (
    <div className="to-do-list">
      <ol className="task-list">
        {data &&
          data.tasks.map((task: Task) => (
            <li
              key={task.id}
              className={task.isComplete ? 'completed' : ''}
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.isComplete}
                onChange={() => handleTaskUpdate(task.id, !task.isComplete)}
              />
              <span className="task-title">{task.title}</span>
              <button className="delete-button" onClick={() => handleTaskDelete(task.id)}>
                X
              </button>
            </li>
          ))}
      </ol>
    </div>
  );
  
}