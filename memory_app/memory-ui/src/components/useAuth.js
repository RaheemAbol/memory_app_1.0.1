import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token ? true : false);
  };

  useEffect(() => {
    checkToken();

    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return isAuthenticated;
};

export default useAuth;
