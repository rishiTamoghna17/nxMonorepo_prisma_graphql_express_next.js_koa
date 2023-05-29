'use client';
import React, { useState } from 'react';
import './SignupForm.css';
import { useRouter } from 'next/navigation';


const LiginForm = (props: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [submit, setSubmit] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == 'User log in successfully') {
          alert('User log in successfully');
          localStorage.setItem('authToken', data.token);
          router.push('/');
        }if (data.message == "user not found" ||data.message == "unauthenticated person") {
            alert('user or password not matched');
          }
        
      })
      .catch((error) => error.message);

    // Perform form validation and submit the data to the server
    // You can make an API request to the backend here
    // console.log(formData);
    // Reset the form fields
    setFormData({
      email: '',
      password: '',
    });
    setSubmit(true);
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

export default LiginForm;
