import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoginButton: React.FC = () => {
  return (
    <Box className=''>
      <Link to='/login'>
        <Button
          variant='contained'
          className='btn-info btn-sm'>
          <span className='text-nowrap'>Log In</span>
        </Button>
      </Link>
    </Box>
  );
};

export default LoginButton;
