import { Box } from "@mui/material";
import React from "react";

const MyContributionsDisplay: React.FC = () => {
  const testArr = [{ id: 1, text: "asdf" }];
  return (
    <Box>
      {testArr.map((item) => {
        return <Box key={item.id}>{item.text}</Box>;
      })}
    </Box>
  );
};

export default MyContributionsDisplay;
