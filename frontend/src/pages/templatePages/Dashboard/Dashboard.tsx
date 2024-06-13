import React from "react";
import Header from "../../../common/components/layout/Header/Header";
import { Outlet } from "react-router";
import Footer from "../../../common/components/layout/Footer";
import Box from "@mui/material/Box";
import CallToAction from "../../../common/components/layout/CallToAction/CallToAction";

const Dashboard = () => {
  return (
    <div>
      <Header />
      {/* <Outlet /> */}

      <Box
        sx={{
          order: "20",
          marginTop: "auto",
        }}>
        <CallToAction />
      </Box>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
