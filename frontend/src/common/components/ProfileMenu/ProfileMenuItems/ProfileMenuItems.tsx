import Box from "@mui/material/Box";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/store";
import React from "react";

const ProfileMenuItems: React.FC = () => {
  const user_id = useSelector((state: RootState) => state.user.user?.user_id || 0);
  const accountItems = [
    { to: "account", label: "Account" },
    { to: `profile/${user_id}`, label: "Profile" },
    { to: "my-bookmarks", label: "My Bookmarks" },
    { to: "my-covers", label: "My Covers" },
    { to: "my-pages", label: "My Pages" },
    { to: "settings", label: "Settings" },
    { to: "/logout", label: "Logout" },
  ];
  return (
    <Box>
      {accountItems.map((item, index) => {
        const { to, label } = item;
        return (
          <Dropdown.Item
            key={index}
            as={Link}
            to={to}>
            {label}
          </Dropdown.Item>
        );
      })}
    </Box>
  );
};

export default ProfileMenuItems;
