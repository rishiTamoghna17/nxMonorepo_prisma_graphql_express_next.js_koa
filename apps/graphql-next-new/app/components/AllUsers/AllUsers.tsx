'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { allUsers } from '../Graphql/queries/Queries';
import { useRouter } from 'next/navigation';

import styles from './AllUser.module.css';

function AllUser() {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const { data, loading } = useQuery(allUsers, { fetchPolicy: 'no-cache' });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!token) router.push('/signIn');
      if (!data) {
        <p>Loading...</p>;
      }
    }
  }, [router]);

  if (!data && loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <h2 className={styles.allUserHeading}>All Users</h2>
    <div className={styles.allUserContainer}>
      {data?.allUsers.map((user) => (
        <UserCard key={user.id} user={user} router={router} />
      ))}
    </div>
    </>
  );
}

function UserCard({ user, router }) {
  const handleClick = () => {
    router.push(`/users/${user.id}`);
  };

  return (
    <div className={styles.userCardContainer}>
    <div className={styles.userCard}>
      <h3 className={styles.userName}>{user.name}</h3>
      <p className={styles.userEmail}>{user.email}</p>
      <p className={styles.userEmail}>{user.id}</p>

      <button className={styles.userProductsLink} onClick={handleClick}>
        View Products
      </button>
    </div>
    </div>
  );
}

export default AllUser;

// export default AllUser;
// <div className={styles.allUserContainer}>
//   <h2 className={styles.allUserHeading}>All Users</h2>
//   {data?.allUsers.map((user) => (
//     <UserCard key={user.id} user={user} router={router} />
//   ))}
// </div>

// function UserCard({ user, router }) {
//   const handleClick = () => {
//     router.push(`/users/${user.id}`);
//   };

//   return (
//     <div className={styles.userCard}>
//       <h3 className={styles.userName}>{user.name}</h3>
//       <p className={styles.userEmail}>{user.email}</p>
//       <p className={styles.userEmail}>{user.id}</p>

//       <button className={styles.userProductsLink} onClick={handleClick}>
//         View Products
//       </button>
//     </div>
//   );
// }

