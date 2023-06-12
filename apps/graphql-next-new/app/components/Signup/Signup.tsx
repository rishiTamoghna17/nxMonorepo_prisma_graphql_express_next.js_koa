'use client';
import './Signup.css';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { create_User } from '../Graphql/mutations/Mutation';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser, { data, loading, error }] = useMutation(create_User, {
    variables: { name, email, password },
  });
  const router = useRouter();

  if (loading) return <p className="loading">Loading ....</p>;
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '')
      return alert('Enter fields');
    createUser({ variables: { name, email, password } })
      .then((res) => {
        if (res) {
          alert(`Congratulations, ${res.data.createUser.name}, you have successfully registered!`);
          router.push('/signIn');
          // console.log(res.data.createUser);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message + ' please tray different email');
      });
    // setName("");
    // setEmail("");
    // setPassword("");
  };

  return (
    <div>
      <p className="sign-up">Please Register</p>
      <form className="form-data" onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="test@exm.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder=" minimum 10 digits required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
