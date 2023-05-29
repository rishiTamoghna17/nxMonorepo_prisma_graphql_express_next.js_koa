"use client"
import Link from 'next/link';
import "./navbar.css"
import React from 'react';
// import SigningButton from './SigningButton';
import{useRouter} from 'next/navigation'

function Navbar() {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push('/login');
  }
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/to-do">to-do List</Link>
      <Link href="/universityList/India">university List</Link>
      <Link href="/formdata">form data</Link>
      <Link href="/userDetails">User Details</Link>
      <Link href="/signUp">register</Link>
      <Link href="/login">login</Link>
      <h1 className='logout' onClick={handleLogout}>logout</h1>
    </nav>
  );
}

export default Navbar;
