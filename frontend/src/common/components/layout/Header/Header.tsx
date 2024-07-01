import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderAccount from "./HeaderAccount/HeaderAccount";
import "./header.styles.scss";
import Box from "@mui/material/Box";
import ControlPanel from "../../ControlPanel/ControlPanel";
import React from "react";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Box
        className='header-container'
        sx={{
          display: "flex",
          marginTop: ".5rem",
          marginBottom: ".2rem",
          paddingBottom: ".5rem",
          paddingX: ".5rem",
          gap: "1rem",
          boxShadow: "0 4px 8px -2px lightgray",
        }}>
        <HeaderLogo />
        <HeaderSearch />
        <HeaderAccount />
      </Box>
      <Box>
        <ControlPanel />
      </Box>
    </Box>
  );
};

export default Header;
