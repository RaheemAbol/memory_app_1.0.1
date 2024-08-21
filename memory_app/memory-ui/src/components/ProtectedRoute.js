// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoute = ({ redirectTo = "/login" }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to={redirectTo} />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, redirectTo = "/login" }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  return <Component />;
};

export default ProtectedRoute;
