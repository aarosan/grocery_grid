import React, { useEffect, useState } from 'react';
import TestForm from './components/TestForm';
import TestList from './components/TestList';

const App = () => {
  const [tests, setTests] = useState([]);

  const fetchTests = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tests');
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div className="App">
      <h1>Test Management</h1>
      <TestForm fetchTests={fetchTests} />
      <TestList tests={tests} />
    </div>
  );
};

export default App;
