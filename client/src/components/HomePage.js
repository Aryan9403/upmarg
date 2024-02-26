import React, { useEffect, useState } from 'react';

function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/test')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <div>{message || 'Loading...'}</div>;
}

export default HomePage;
