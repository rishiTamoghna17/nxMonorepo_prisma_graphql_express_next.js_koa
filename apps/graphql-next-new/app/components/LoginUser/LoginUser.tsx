'use client';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Log_In } from '../Graphql/mutations/Mutation';
function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LogIn, { data, loading, error }] = useMutation(Log_In, {
    variables: { email, password },
  });
  const router = useRouter();

  if (loading) return <p className="loading">Loading ....</p>;
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') return alert('Enter fields');
    LogIn({ variables: { email, password } })
      .then((res) => {
        if (res) {
          alert(
            `Congratulations, you have successfully loggedin!`
          );
          router.push('/');
          // console.log(res.data.createUser);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message + ' please tray different email');
      });
  };
  return (
      <div>
        <p className="sign-in"> Log In Here</p>
        <form className="form-data" onSubmit={handleSubmit}>
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
          <button type="submit">Sign in</button>
        </form>
      </div>
  );
}

export default LoginUser;
