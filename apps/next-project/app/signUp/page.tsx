import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <div>
      <h1 style={{
"position": "relative",
"left": "40%",
}}>Sign Up</h1>
      <SignupForm formUser="form-input" />
    </div>
  );
};

export default SignupPage;
