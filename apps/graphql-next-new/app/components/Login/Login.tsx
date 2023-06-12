'use client';
import './Login.css';
import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Log_In } from '../Graphql/mutations/Mutation';
function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LogIn, { data, loading, error }] = useMutation(Log_In, {
    variables: { email, password },
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') alert('Enter fields');

    await LogIn({ variables: { email, password } })
    .catch((err) =>
      // console.log(err.message),
      window.location.reload()// Error occurred, refresh the page
    );

    // localStorage.setItem('authToken', data.login.token);
    // console.log(data.login.token)
    // // console.log( localStorage.getItem('authorization'))
    // alert(`Congratulations,${data.login.name} you have successfully loggedin!`);
    // router.push('/');
  };
  useEffect(() => {
    if (data) {
      localStorage.setItem('authToken', data.login.token);
      alert(
        `Congratulations, ${data.login.name}, you have successfully logged in!`
      );
      router.push('/');
    }
  }, [data, router]);

  if (loading)  <p className="loading">Loading ....</p>;
  // if (error)  <p className="loading">{error.message}</p>;

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">Log In Here</h2>
        <form className="form-data" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="test@exm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="minimum 10 digits required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
