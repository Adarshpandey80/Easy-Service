import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function ShopkeeperAuth({ children }) {
  const token = localStorage.getItem("shopowner");
  const location = useLocation();

  // Not logged in → redirect
  useEffect(() => {
  if (!token) {
    return (
      <Navigate
        to="/owner/ShopOwnerLoginForm"
        replace
        state={{ from: location.pathname }}
      />
    );
  }
    }, [token]);

  // Logged in → allow access
  return children;
}

export default ShopkeeperAuth;