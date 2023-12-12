// SignOut.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add your sign-out logic here, such as clearing authentication tokens or user data
    // For simplicity, you can simulate sign-out by clearing local storage
    localStorage.clear();
    
    // Redirect to the home page after sign-out
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <h2>Signing Out...</h2>
      {/* You can add a loading spinner or other content if needed */}
    </div>
  );
}

export default SignOut;
