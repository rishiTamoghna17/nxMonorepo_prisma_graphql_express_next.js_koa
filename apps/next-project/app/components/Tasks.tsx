"use client";
import React, { useEffect, useState } from 'react'
import {gql}from "@apollo/client"
import "./task.css"

export const revalidate = 0
export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`query {
  tasks {
    id
    title
    isComplete
  }
}
`
;

export default function todoList() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data }:any = useSuspenseQuery(query,{fetchPolicy: "no-cache" },);
  // const [hydrated, setHydrated] = useState(false);
  // useEffect(() => {
  //   setHydrated(true);
  // },[])

  return (
    <div className = "to-do-list">
    <ol className="task-list"> {/* Apply CSS class to the ul element */}
      {data.tasks.map((task:any) => (
        <li key={task.id} className={task.isComplete ? 'completed' : ''}> {/* Apply CSS class based on isComplete value */}
          {task.title}
        </li>
      ))}
    </ol>
    </div>
  );
}