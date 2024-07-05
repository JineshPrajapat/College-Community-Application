import React from 'react';
import appURL from "../../../api/webapp";

export const HelpCenter = () => {
  const userName = localStorage.getItem("userName");
  return (
    <div>
      <div className="mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Help Center</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Account Settings:</h3>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-2">
              <a href={`${appURL}/Setting/Security/resetPassword`} className="text-blue-500 hover:underline">Change Password</a>
            </li>
            <li className="mb-2">
              <a href={`${appURL}/Setting/Security/resetUsername`} className="text-blue-500 hover:underline">Change Username</a>
            </li>
            <li className="mb-2">
              <a href={`${appURL}/Setting/Security/changeEmail`} className="text-blue-500 hover:underline">Change Email</a>
            </li>
            <li className="mb-2">
              <a href={`${appURL}/${userName}/Update`} className="text-blue-500 hover:underline">Profile Settings</a>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About Us:</h3>
          <p className="mb-4">
            Welcome to our website! We are dedicated to providing a seamless and enjoyable experience for all our users.
          </p>
          <p className="mb-4">
            For any inquiries or assistance, please contact our Help Center at <a href="mailto:help@website.com" className="text-blue-500 hover:underline">help@website.com</a>.
          </p>
        </div>
        <div>
          {/* <h3 className="text-lg font-semibold mb-2">More Information:</h3> */}
          {/* Add more information as needed */}
        </div>
      </div>
    </div>
  )
}
