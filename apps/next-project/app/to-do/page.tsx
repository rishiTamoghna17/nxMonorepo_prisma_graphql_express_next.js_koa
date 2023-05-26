import React from 'react'
import Tasks from '../components/Tasks'
import dynamic from 'next/dynamic';
 
const DynamicTasks = dynamic(() => import('../components/Tasks'), {
  loading: () => <p>Loading...</p>,
});
function index() {
  const myStyle = {
    "height": "100%",
    "width": "100%",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  }
  return (
    <div >
    <h1 style={myStyle}>Task List</h1>
    <DynamicTasks />
  </div>

  )
}

export default index