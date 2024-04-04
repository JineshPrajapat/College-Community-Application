import React from 'react';

const Connection = () => {
  return (
    <div className=" mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Connection Information</h2>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          Our platform facilitates connections between users without requiring explicit connection requests.
        </p>
        <p className="text-gray-600 mb-2">
          We provide a seamless and requestless connection experience, enabling users to connect with each other effortlessly.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Terms and Conditions Policy:</h3>
        <p className="text-gray-600 mb-2">
          Users can refer to our terms and conditions policy for detailed information on how connections are established on our platform.
        </p>
        <p className="text-gray-600 mb-2">
          Our policy ensures that connections are established securely and efficiently, enhancing the user experience.
        </p>
      </div>
    </div>
  );
};

export default Connection;
