import React from 'react';

const Home = () => {
  return (
    <div
      className="home"
      style={{
        height: '100vh', // Set the height to fill the viewport
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white', // Text color
        textAlign: 'center', // Center align text
      }}
    >
      <div>
        <h1>Welcome to Expense Tracker</h1>
      </div>
    </div>
  );
};

export default Home;
