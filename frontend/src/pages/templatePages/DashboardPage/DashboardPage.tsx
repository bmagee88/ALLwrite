import React from "react";
import Header from "../../../common/components/layout/Header/Header";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import CallToAction from "../../../common/components/ControlPanel/ControlPanel";
import { bottomNavItems } from "../../../common/components/ControlPanel/config";

const DashboardPage: React.FC = () => {
  return (
    <Box
      id='dashboard'
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
      <Header />
      <Outlet />
      <CallToAction
        items={bottomNavItems}
        justifyContent={"space-around"}
        placement={{ position: "sticky", bottom: "0", right: "0", left: "0" }}
      />
    </Box>
  );
};

export default DashboardPage;
