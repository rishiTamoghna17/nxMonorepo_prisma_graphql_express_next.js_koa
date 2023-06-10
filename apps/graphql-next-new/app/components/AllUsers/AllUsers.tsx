'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { allUsers } from '../Graphql/queries/userQueries';
import { useRouter } from 'next/navigation';

import styles from './AllUser.module.css';

function AllUser() {
  const { data } = useQuery(allUsers, { fetchPolicy: 'no-cache' });
  const router = useRouter();

  return (
    <div className={styles.allUserContainer}>
      <h2 className={styles.allUserHeading}>All Users</h2>
      {data?.allUsers.map((user) => (
        <UserCard key={user.id} user={user} router={router} />
      ))}
    </div>
  );
}

function UserCard({ user, router }) {
  const handleClick = () => {
    router.push(`/users/${user.id}`);
  };

  return (
    <div className={styles.userCard}>
      <h3 className={styles.userName}>{user.name}</h3>
      <p className={styles.userEmail}>{user.email}</p>
      <p className={styles.userEmail}>{user.id}</p>

      <button className={styles.userProductsLink} onClick={handleClick}>
        View Products
      </button>
    </div>
  );
}

export default AllUser;

