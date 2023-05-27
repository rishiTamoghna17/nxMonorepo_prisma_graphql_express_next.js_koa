import Link from 'next/link';
import "./navbar.css"
import React from 'react';
import SigningButton from './SigningButton';

function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/to-do">to-do List</Link>
      <Link href="/universityList/India">university List</Link>
      <Link href="/formdata">form data</Link>
      <SigningButton />
      <Link href="/register">register</Link>
    </nav>
  );
}

export default Navbar;
