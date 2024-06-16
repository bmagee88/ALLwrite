import React from "react";
import Header from "../../../common/components/layout/Header/Header";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import CallToAction from "../../../common/components/layout/CallToAction/CallToAction";

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Outlet />

      <Box
        sx={{
          order: "20",
          marginTop: "auto",
        }}>
        <CallToAction />
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default DashboardPage;
