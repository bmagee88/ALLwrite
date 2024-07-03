import React, { useState } from "react";
import Header from "../../../common/components/layout/Header/Header";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import CallToAction from "../../../common/components/ControlPanel/ControlPanel";
import { bottomNavItems } from "../../../common/components/ControlPanel/config";
import useScrollDirection from "../../../common/hooks/useScrollDirection/useScrollDirection";
import { useIsScrollable } from "../../../common/hooks/useIsScrollable/useIsScrollable";

const DashboardPage: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const isScrollable = useIsScrollable();
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
      <Box sx={{ paddingBottom: "40px", width: "100vw" }}></Box>
      <CallToAction
        items={bottomNavItems}
        justifyContent={"space-around"}
        sizing={{ height: "40px", width: "100vw" }}
        placement={{
          position: "fixed",
          bottom: "0",
          right: "0",
          left: "0",
        }}
        animation={{
          transition: "transform 0.3s ease-in-out",
          transform:
            !isScrollable || scrollDirection === "down" ? "translateY(0)" : "translateY(100%)",
          zIndex: 1000,
        }}
        styles={{
          backgroundColor: "white",
        }}
      />
    </Box>
  );
};

export default DashboardPage;
