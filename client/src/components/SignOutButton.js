import React from 'react';

const SignOutButton = ({ signOut }) => {
  return (
    <button onClick={signOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
