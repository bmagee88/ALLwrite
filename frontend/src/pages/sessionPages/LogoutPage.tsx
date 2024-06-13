import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../common/store/user/userSlice";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    navigate("/");
    navigate(0);
  }, []);

  return <div>logging out...</div>;
};

export default LogoutPage;
