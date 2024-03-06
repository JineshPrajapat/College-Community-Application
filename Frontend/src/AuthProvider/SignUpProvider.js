import React, { createContext, useContext, useState } from 'react';

const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <SignUpContext.Provider value={{ isSignedUp, setIsSignedUp }}>
      {children}
    </SignUpContext.Provider>
  );
};

export function useSignUp(){
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error('useSignUp must be used within a SignUpProvider');
      }
    return useContext(SignUpContext);
}
