import React from 'react'
import Tasks from '../components/Tasks'

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
    <Tasks />
  </div>

  )
}

export default index