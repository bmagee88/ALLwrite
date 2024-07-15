import { Box } from "@mui/material";
import React from "react";

interface MyContributionsDisplayProps {
  contributions: [];
}

const MyContributionsDisplay: React.FC<MyContributionsDisplayProps> = ({ contributions }) => {
  //   const testArr = [{ id: 1, text: "asdf" }];
  return (
    <Box>
      {contributions.map((cont, index) => {
        return (
          <Box key={index}>
            <Box fontWeight={"bold"}>{cont.covertitle}</Box>
            <Box>{cont.pagebody}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MyContributionsDisplay;
