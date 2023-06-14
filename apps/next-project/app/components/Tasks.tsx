'use client';
import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './task.css';
import { Get_tasks } from './Graphql/queries';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

// import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";



export default function todoList() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        {' '}
        {/* Apply CSS class to the ul element */}
        {data &&
          data.tasks.map((task: any) => (
            <li key={task.id} className={task.isComplete ? 'completed' : ''}>
              {' '}
              {/* Apply CSS class based on isComplete value */}
              {task.title}
            </li>
          ))}
      </ol>
    </div>
  );
}
