'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { getUserById } from "../../components/Graphql/queries/Queries";

function UserDetail() {
  const router = useRouter();
  const  id  = router.query;

  // Fetch user data using the id parameter
  const { data } = useQuery(getUserById, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  const user = data.userById;

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <h3>Products</h3>
      {user.products.length > 0 ? (
        <ul>
          {user.products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default UserDetail;
