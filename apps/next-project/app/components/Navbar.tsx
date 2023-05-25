import Link from 'next/link';
import "./navbar.css"
import React from 'react';

function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/to-do">to-do List</Link>
      <Link href="/universityList/India">university List</Link>
      <Link href="/formdata">form data</Link>
    </nav>
  );
}

export default Navbar;
