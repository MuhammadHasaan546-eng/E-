// import React, { use } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// const CheckedAuth = ({ isAuthenticated, user, children }) => {
//   const location = useLocation();
//   if (
//     (!isAuthenticated && location.pathname.includes("/admin")) ||
//     location.pathname.includes("/register")
//   ) {
//     return <Navigate to="/auth/login" />;
//   }
//   if (
//     isAuthenticated &&
//     location.pathname.includes(
//       "/login" || location.pathname.includes("/register"),
//     )
//   ) {
//     if (user?.roll === "admin") {
//       return <Navigate to="/admin/dashboard" />;
//     } else {
//       return <Navigate to="/shop/home" />;
//     }
//   }
//   if (
//     isAuthenticated &&
//     user?.roll !== "admin" &&
//     location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }
//   if (
//     isAuthenticated &&
//     user?.roll === "admin" &&
//     location.pathname.includes("shop")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }
//   return <>{children}</>;
// };
// export default CheckedAuth;

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckedAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Not logged in & trying to access admin or shop
  if (
    !isAuthenticated &&
    (path.startsWith("/admin") || path.startsWith("/shop"))
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  //  Logged in & trying to access auth pages
  if (
    isAuthenticated &&
    (path.startsWith("/auth/login") || path.startsWith("/auth/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Logged in but not admin trying to access admin
  if (isAuthenticated && user?.role !== "admin" && path.startsWith("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Admin trying to access shop
  if (isAuthenticated && user?.role === "admin" && path.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default CheckedAuth;
