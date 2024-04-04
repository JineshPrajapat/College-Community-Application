import React, { useState } from 'react';

const DeleteAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);

  const handleVerifyPassword = () => {
    // Simulated logic to verify password
    // Replace with actual authentication logic
    setIsPasswordVerified(true);
  };

  const handleDeleteAccount = () => {
    // Simulated logic to delete account
    // Replace with actual account deletion logic
    setIsAccountDeleted(true);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {!isPasswordVerified && !isAccountDeleted && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleVerifyPassword}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
          >
            Verify Password
          </button>
        </>
      )}
      {isPasswordVerified && !isAccountDeleted && (
        <div className="mt-4">
          <p className="text-red-600 font-semibold mb-2">Are you sure you want to delete your account?</p>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      )}
      {isAccountDeleted && (
        <div className="mt-4 text-red-600 font-semibold">
          <p>Your account has been successfully deleted.</p>
          <p>All your information has been permanently removed.</p>
          <p>We're sorry to see you go.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
