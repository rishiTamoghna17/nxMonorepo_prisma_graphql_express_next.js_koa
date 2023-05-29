'use client';
import React, { useState } from 'react';
import './SignupForm.css';
import{useRouter} from 'next/navigation'

const SignupForm = (props: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [submit,setSubmit] = useState(false)

  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/signup', {
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
        if (data.message == 'User created successfully') {
          alert('User created successfully');
          router.push('/login');
        }
        if (data.message=='Missing required fields') {
          alert('Missing required fields');
        }
        if (data.message == `${data.email} is already present`) {
          alert(`${data.email} already exists`);
        }
      }).catch((error) => error.message);

    // Perform form validation and submit the data to the server
    // You can make an API request to the backend here
    // console.log(formData);
    // Reset the form fields
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    setSubmit(true);
    
  };

  return (
    <form className="form-data" onSubmit={handleSubmit}>
      <div className={props.formUser}>
        <label>User Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="name"
          onChange={handleChange}
        />
      </div>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
