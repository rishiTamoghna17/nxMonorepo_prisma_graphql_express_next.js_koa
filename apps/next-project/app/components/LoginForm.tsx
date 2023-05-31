'use client';
import React, { useEffect, useState } from 'react';
import './SignupForm.css';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";


const LiginForm = (props: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [submit, setSubmit] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(user){
      router.push("/userDetails")
    }
  },[user])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticateUser()
    
    setFormData({
      email: '',
      password: '',
    });
    // ****************** login ********************************
    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   cache: 'no-cache',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.message == 'User log in successfully') {
    //       alert('User log in successfully');
    //       localStorage.setItem('authToken', data.token);
    //       router.push('/');
    //     }if (data.message == "user not found" ||data.message == "unauthenticated person") {
    //         alert('user or password not matched');
    //       }
        
    //   })
    //   .catch((error) => error.message);

    // Perform form validation and submit the data to the server
    // You can make an API request to the backend here
    // console.log(formData);
    // Reset the form fields
    // setSubmit(true);
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      // callbackUrl : `${window.location.origin}/userDetails`,
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


export default LiginForm;
