'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './universityStyle.css';

export default function University() {
  const [countryName, setCountryName] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (countryName.trim() !== '') {
      router.push(`/universityList/${countryName}`);
    }
  };

  return (
    <>
      <h1 className='university-heading'>search Universities in your country</h1>
      <form action="" className="search-bar" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Enter country name"
        />
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </>
  );
}
