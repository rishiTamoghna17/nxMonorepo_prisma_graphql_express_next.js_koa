import React from 'react';
import Dog from './components/RandomDog';

function page() {
  return (
    <>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Welcome Home
      </div>
      <div
        style={{
          border: '1px solid black',
          margin: 'auto',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'white',
          display: 'flex',
          width: '70%',
          justifyContent: 'space-around', // Add space between the dogs
        }}
      >
        <div
          style={{
            // border: '1px solid red',
            // padding: '1rem',
            verticalAlign: 'middle',
            flex: '1',
            margin: '10px',
          }}
        >
          <Dog />
        </div>
        <div
          style={{
            // border: '1px solid red',
            // padding: '1rem',
            verticalAlign: 'middle',
            flex: '1',
            margin: '10px',
          }}
        >
          <Dog />
        </div>
      </div>
    </>
  );
  
}

export default page;
