'use client';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { allUsers } from '../Graphql/queries/Queries';
import { useRouter } from 'next/navigation';

import styles from './AllUser.module.css';

function AllUser() {
  const { data, loading } = useQuery(allUsers, { fetchPolicy: 'no-cache' });
  const router = useRouter();


    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!token) router.push('/signIn');
      if (!data) {
        return <p>Loading...</p>;
      }
    }
  
  // localStorage.removeItem("name of the item")
  if (!data && loading) {
    return <p className="loading">Loading...</p>;
  }
  return (
    <div className={styles.cardContainer}>
      {data.allUsers.map((user) => (
        <div key={user.id} className={styles.card}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>{user.email}</p>
          <div className={styles.products}>
            {user.products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <h4 className={styles.productTitle}>{product.title}</h4>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <p className={styles.productPrice}>Price: {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    // <div className={styles.allUserContainer}>
    //   <h2 className={styles.allUserHeading}>All Users</h2>
    //   {data?.allUsers.map((user) => (
    //     <UserCard key={user.id} user={user} router={router} />
    //   ))}
    // </div>
  );
}

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

export default AllUser;
