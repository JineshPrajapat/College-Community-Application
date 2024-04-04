import React from 'react';

const ResumeVisibility = () => {
  return (
    <div className=" mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Resume Viewing</h2>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          Our platform allows registered users to view resumes uploaded by other users. 
          Once a user's resume is made public, it can be viewed by anyone with access to the platform.
        </p>
        <p className="text-gray-600 mb-2">
          Registered users also have the option to download resumes for offline viewing and share them with others.
          However, users must adhere to our terms and conditions regarding the appropriate use of shared resumes.
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          The resume viewing feature enhances networking opportunities and facilitates the sharing of professional 
          experiences and qualifications among users on our platform.
        </p>
        <p className="text-gray-600 mb-2">
          For further details regarding resume viewing permissions and sharing policies, please refer to our terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default ResumeVisibility;
