'use client';
import Link from 'next/link';
import './navbar.css';
import React from 'react';
// import SigningButton from './SigningButton';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const userDetail = session?.user;
  const handleLogout = () => {
    signOut({ redirect: false }).then(() => router.push('/login'));
  };
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/to-do">to-do List</Link>
      <Link href="/universityList/India">university List</Link>
      <Link href="/formdata">form data</Link>
      <Link href="/userDetails">User Details</Link>
      <Link href="/signUp">register</Link>
      <div className="login-card">
        <Link href="/login">
          {userDetail
            ? `${userDetail?.name} is Active `
            : 'you are not active  (⌣́_⌣̀) (⌣́_⌣̀) '}
        </Link>
        <p
          className={userDetail ? 'logout' : 'logout-hide'}
          onClick={handleLogout}
        >
          click here to logout
        </p>
      </div>
      {/* <p className='login-card'> {userDetail?`${userDetail?.name}`:"please Signin"}</p> */}
    </nav>
  );
}

export default Navbar;
