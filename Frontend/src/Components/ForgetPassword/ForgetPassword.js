// ForgetPassword.js

import React, { useState } from 'react';
import './ForgetPassword.scss'; // Import the SCSS file for styling

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);

  const handleSendVerification = () => {
    // Code to send verification email
    // You can implement this part using an API call or a mock function
    // Upon successful sending of verification email, setVerificationSent(true)
    setVerificationSent(true);
  };

  const handleVerifyCode = () => {
    // Code to verify the verification code
    // You can implement this part using an API call or a mock function
    // Upon successful verification, setResetPassword(true)
    setResetPassword(true);
  };

  const handleResetPassword = () => {
    // Code to reset password
    // You can implement this part using an API call or a mock function
    // Upon successful password reset, setPasswordResetSuccessful(true)
    setPasswordResetSuccessful(true);
  };

  return (
    <div className="forget-password-container">
      {!verificationSent && (
        <div className="forget-password-step">
          <h2>Forget Password</h2>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="send-verification-btn" onClick={handleSendVerification}>Send Verification</button>
        </div>
      )}
      {verificationSent && !resetPassword && (
        <div className="forget-password-step">
          <h2>Verify Email</h2>
          <p>A verification code has been sent to your email.</p>
          <label>Verification Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button className="verify-code-btn" onClick={handleVerifyCode}>Verify</button>
        </div>
      )}
      {resetPassword && !passwordResetSuccessful && (
        <div className="forget-password-step">
          <h2>Reset Password</h2>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="reset-password-btn" onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
      {passwordResetSuccessful && (
        <div className="forget-password-step">
          <h2>Password Reset Successful</h2>
          <p>Your password has been successfully reset.</p>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
