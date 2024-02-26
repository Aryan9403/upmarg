// client/src/components/HomePage.js
import React, { useState, useEffect } from 'react';

function HomePage() {
  // State to store fetched data (if needed)
  const [data, setData] = useState(null);

  // Simulated fetching of data
  useEffect(() => {
    // Simulate an API call
    const fetchData = async () => {
      // Simulate a delay
      setTimeout(() => {
        setData({ message: 'Data fetched successfully!' });
      }, 1000);
    };

    fetchData();
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div>
      <h1>Welcome to UpMarg</h1>
      <p>This is the homepage of your educational streaming marketplace platform.</p>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default HomePage;
