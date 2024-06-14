import React from 'react';

const ProfileViewing = () => {
  return (
    <div className=" mx-auto mt-8 p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-2xl font-semibold mb-4">Profile Viewing</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Terms and Conditions Policy:</h3>
        <p className="text-gray-600 mb-2">
          The information provided in your profile is subject to the following viewing permissions:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-1">Only registered users can view your profile.</li>
          <li className="mb-1">
            Registered users can view the following information in your profile:
            <ul className="list-disc ml-6">
              <li className="mb-1">Username</li>
              <li className="mb-1">Email Address</li>
              <li className="mb-1">Profile Picture</li>
              {/* Add more items as needed */}
            </ul>
          </li>
          {/* Add more conditions as needed */}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Who Can View Your Profile:</h3>
        <p className="text-gray-600 mb-2">Only registered users with authenticated accounts can view your profile.</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Information Displayed in Your Profile:</h3>
        <ul className="list-disc ml-6">
          <li className="mb-1">Username</li>
          <li className="mb-1">Email Address</li>
          <li className="mb-1">Profile Picture</li>
          {/* Add more items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default ProfileViewing;
