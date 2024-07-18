import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RegisterButton: React.FC = () => {
  return (
    <Box
      sx={{
        display: "none",
        "@media (min-width: 500px)": {
          display: "block",
        },
      }}>
      <Link to='/register'>
        <Button variant='outlined'>
          <span className='text-nowrap'>Sign Up</span>
        </Button>
      </Link>
    </Box>
  );
};

export default RegisterButton;
