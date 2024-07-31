import React from 'react';

const TestList = ({ tests }) => {
  return (
    <div>
      <h2>Tests</h2>
      <ul>
        {tests.map((test) => (
          <li key={test._id}>{test.testBody}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;
