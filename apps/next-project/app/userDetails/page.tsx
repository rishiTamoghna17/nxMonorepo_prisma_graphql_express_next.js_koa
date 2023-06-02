'use client';
import React, { useEffect, useState } from 'react';
import './user.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function Page() {
  const [user, setUser] = useState();
  const [hydrated, setHydrated] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Newly added state for selected user
  const [updateForm, setUpdateForm] = useState({
    name: '',
    email: '',
    role: '',
  });

  const router = useRouter();
  const { data: session } = useSession();
  const userDetail = session?.user;
  const token = userDetail?.access_token;
  
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

  const handleUpdate = (id) => {
    const selectedUser = user.find((u) => u.id === id);
    setSelectedUser(selectedUser);
    setUpdateForm({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
    });
  };
  
    const handleInputChange = (e) => {
      setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/user/update/${selectedUser.id}`, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateForm),
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the user details after successful update
          const updatedUser = user.map((u) => (u.id === data.id ? data : u));
          setUser(updatedUser);
          setSelectedUser(null); // Reset selected user
          alert('updated user');
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/user/delete/${id}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted user from the user list
        const updatedUser = user.filter((u) => u.id !== id);
        setUser(updatedUser);
        alert('deleted user');
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="container">
      <h1 className="title">User Details</h1>
      {user ? (
        <div className="user-info">
          {user.map((user) => (
            <div
              key={user.id}
              className={`user-card ${
                selectedUser && selectedUser.id === user.id ? 'open-form' : ''
              }`}
            >
              <h3> {user.name} </h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              {selectedUser && selectedUser.id === user.id ? (
                <div className="form-container">
                  <h2>Update User</h2>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={updateForm.name}
                        onChange={handleInputChange}
                      />
                    </label>
                    <br />
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={updateForm.email}
                        onChange={handleInputChange}
                      />    
                    </label>
                    <br />
                    <label>
                      Role:
                      <input
                        type="text"
                        name="role"
                        value={updateForm.role}
                        onChange={handleInputChange}
                      />
                    </label>
                    <br />
                    <button
                      style={{
                        'background-color': '#53b3cb',
                        color: '#fff',
                        border: 'none',
                        'border-radius': '4px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        width: '100%',
                      }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
