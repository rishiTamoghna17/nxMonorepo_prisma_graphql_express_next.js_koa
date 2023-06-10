// 'use client';
import Link from 'next/link';
import './navbar.css';
import React from 'react';
function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/products">products</Link>
      <Link href="/signUp">register</Link>
      <div className="login-card">
        <Link href="/signIn"> log in</Link>
      </div>
    </nav>
  );
}

export default Navbar;
