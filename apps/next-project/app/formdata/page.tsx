'use client';
import React, { useState } from "react";
import "./FormDataStyle.css";

const FormComponent = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { name, email, phone, address };
    console.log(userData);
    alert("form submitted successfully");
    // setEmail('');
    // setPhone('');
    // setName('');
    // setAddress('');
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="tel"
          required
          placeholder="12345"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>
      <br />
      <label>
        Address:
        <textarea
          value={address}
          required
          placeholder="Create a message here..."
          onChange={(event) => setAddress(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
