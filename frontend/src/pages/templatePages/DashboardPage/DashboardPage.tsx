import React from "react";
import Header from "../../../common/components/layout/Header/Header";
import { Outlet } from "react-router";
import Footer from "../../../common/components/layout/Footer";
import Box from "@mui/material/Box";
import CallToAction from "../../../common/components/layout/CallToAction/CallToAction";

const DashboardPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
