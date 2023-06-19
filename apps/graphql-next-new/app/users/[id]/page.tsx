'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { getUserById } from '../../components/Graphql/queries/Queries';
import "./id.css"
function UserDetail() {
  // const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  // console.log(typeof (id))
  // console.log(id)
  // Fetch user data using the id parameter
  const { data, loading, error } = useQuery(getUserById, {
    variables: { getUserByIdId: id },
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const user = data?.getUserById;
  console.log(user);
  return (
    <>
      <h2 className='user-heading'>User Details</h2>
    <div className='user-detail'>
      <p className='user-heading-id'>ID: {user?.id}</p>
      <p className='user-heading-name'>Name: {user?.name}</p>
      <p className='user-heading-email'>Email: {user?.email}</p>

      <h3 className='product-heading'>Products</h3>
      {user?.products?.length > 0 ? (
        <ul className='product-list'>
          {user.products.map((product) => (
            <div key={product.id} className="styles-card">
              <h3 className="styles-name">{product.title}</h3>
              <p className="styles-description">{product.description}</p>
              <p className="styles-price">{product.price}</p>
              {product.thumbsUp ? (
          <p className="productThumbsUp">👍</p>
        ) : (
          <p className="productThumbsDown">👎</p>
        )}
            </div>
          ))}
        </ul>
      ) : (
        <p className='no-products'>No products found.</p>
      )}
    </div>
    </>
  );
}

export default UserDetail;
