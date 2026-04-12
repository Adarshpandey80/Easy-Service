import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function ShopkeeperAuth({ children }) {
  const token = localStorage.getItem("shopowner");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Not logged in → redirect (only if not already on login page)
    if (!token && !location.pathname.includes("ShopOwnerLoginForm")) {
      navigate("/owner/ShopOwnerLoginForm", { 
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [token, location.pathname, navigate]);

  // Not logged in and not on login page → don't render children yet
  if (!token && !location.pathname.includes("ShopOwnerLoginForm")) {
    return null;
  }

  // Logged in or on login page → allow access
  return children;
}

export default ShopkeeperAuth;