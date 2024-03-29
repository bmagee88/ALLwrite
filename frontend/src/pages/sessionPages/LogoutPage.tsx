import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("firstname");
    sessionStorage.removeItem("lastname");
    sessionStorage.removeItem("email");
    navigate("/");
    navigate(0);
  }, []);
  return <>logging out</>;
};

export default LogoutPage;
