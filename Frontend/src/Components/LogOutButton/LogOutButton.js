import React from 'react';
// import { useHistory } from 'react-router-dom';

function LogOutButton() {
  // const history = useHistory();

  const handleLogout = () => {
    // Clear user session data
    localStorage.clear(); // or sessionStorage.clear();
    sessionStorage.clear();

    window.location.href = '/'; 
    // Redirect to login page
    // history.push('/login');
  };

  return (
    <button onClick={handleLogout} className=' bg-white p-1 '>Logout</button>
  );
}

export default LogOutButton;
