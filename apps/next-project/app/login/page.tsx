import React from 'react'
import LoginForm from '../components/LoginForm';

function page() {
  return (
    <div>
    <h1 style={{
"position": "relative",
"left": "40%",
}}>Login In</h1>
    <LoginForm formUser="form-input-hide"/>
  </div>
);
}

export default page