
import Link from 'next/link';
import './navbar.css';
import React from 'react';
function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      {/* <Link href="/userDetails">User Details</Link> */}
      <Link href="/signUp">register</Link>
      <Link href="/signIn">Login </Link>
    </nav>
  );
}

export default Navbar;
