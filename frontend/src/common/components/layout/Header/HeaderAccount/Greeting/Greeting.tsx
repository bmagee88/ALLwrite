import Box from "@mui/material/Box";
import React from "react";

interface GreetingProps {
  username: string;
}

const Greeting: React.FC<GreetingProps> = ({ username }) => {
  return (
    <Box sx={{ flexBasis: "content" }}>
      Hello, <br></br>
      {username}
    </Box>
  );
};

export default Greeting;
