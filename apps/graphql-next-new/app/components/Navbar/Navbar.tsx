'use client';
import Link from 'next/link';
import './navbar.css';
import React from 'react';
import { useRouter } from 'next/navigation';
function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/signIn')
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/products">products</Link>
      <Link href="/signUp">register</Link>
      <div className="login-card">
        <Link href="/signIn"> log in</Link>
        <p className="logout" onClick={handleLogout}> log out</p>

      </div>
    </nav>
  );
}

export default Navbar;
