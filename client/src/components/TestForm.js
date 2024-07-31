import React, { useState } from 'react';

const TestForm = ({ fetchTests }) => {
  const [testBody, setTestBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/API/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testBody }),
      });
      if (response.ok) {
        setTestBody('');
        fetchTests(); // Refresh the list of tests
      } else {
        console.error('Failed to add test');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={testBody}
        onChange={(e) => setTestBody(e.target.value)}
        placeholder="Enter test body"
        required
      />
      <button type="submit">Add Test</button>
    </form>
  );
};

export default TestForm;
