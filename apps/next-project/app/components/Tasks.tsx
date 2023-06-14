'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import './task.css';
import { Get_tasks } from './Graphql/queries';

export default function todoList() {
  const { data, loading }: any = useQuery(Get_tasks, {
    fetchPolicy: 'no-cache',
  });
  // const [hydrated, setHydrated] = useState(false);
  // useEffect(() => {
  //   setHydrated(true);
  // },[])
  if (loading) return <p>loading ...</p>;

  return (
    <div className="to-do-list">
      <ol className="task-list">
        {data &&
          data.tasks.map((task: any) => (
            <li key={task.id} className={task.isComplete ? 'completed' : ''}>
              {task.title}
            </li>
          ))}
      </ol>
    </div>
  );
}
