import React from 'react'
import LiginForm from '../components/LoginForm';

function page() {
  return (
    <div>
    <h1 style={{
"position": "relative",
"left": "40%",
}}>Login In</h1>
    <LiginForm formUser="form-input-hide"/>
  </div>
);
}

export default page