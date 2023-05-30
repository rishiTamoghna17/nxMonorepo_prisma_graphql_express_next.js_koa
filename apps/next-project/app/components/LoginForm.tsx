'use client';
import React, { useState } from 'react';
import './SignupForm.css';
import { signIn } from 'next-auth/react';

const LoginForm = (props: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticationUser().then((user)=>console.log(user));
  };

  const authenticationUser = async () => {
    await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: '/',
    });
  };
  return (
    <form className="form-data" onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="test@exm.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder=" minimum 10 digits required"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
