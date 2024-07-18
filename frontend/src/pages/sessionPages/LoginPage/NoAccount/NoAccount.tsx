import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NoAccount = () => {
  return (
    <Box sx={{ display: "flex", marginTop: "1rem", justifyContent: "flex-end" }}>
      <Typography>
        <Box
          component='span'
          sx={{ whiteSpace: "nowrap" }}>
          Don't have an account?{" "}
        </Box>
        <Link to='/register'>Register Here</Link>
      </Typography>
    </Box>
  );
};

export default NoAccount;
