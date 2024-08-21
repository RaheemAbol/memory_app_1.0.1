import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/register");
    }
  }, [navigate, token]);

  return <div>Loading...</div>;
};

export default Landing;
