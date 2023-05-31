'use client';
import React, { useEffect, useState } from 'react';
import './user.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
function page() {
  const [user, setUser] = useState();
  const [hydrated, setHydrated] = useState(false);
  
  const router = useRouter();
  const { data: session } = useSession();
  const userDetail = session?.user;
  const token = userDetail?.access_token
  // const token = localStorage.getItem('authToken');
  useEffect(() => {
    setHydrated(true);
    if (!token) return router.push('/login');
    fetch('http://localhost:3000/user', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
}

  return (
<div className="container">

{/* <p className='login-card'> {userDetail?`${userDetail?.name} is logged in`:"please login"}</p> */}
  <h1 style={{
"position": "relative",
"left": "40%",
}}>user details</h1>
  {user ? (
    <div className="user-info">
      {user.map((user) => (
        <ul key={user.id} className="user-id">
          <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </ul>
      ))}
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

  );
}

export default page;
