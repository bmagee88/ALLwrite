import Box from "@mui/material/Box";
import React from "react";
import FeedbackButton from "./FeedbackButton/FeedbackButton";
import ShareButton from "./ShareButton/ShareButton";
import DonateButton from "./DonateButton/DonateButton";

const CallToAction: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: ".5rem",
        justifyContent: "space-evenly",
      }}>
      <FeedbackButton />
      <ShareButton />
      <DonateButton />
    </Box>
  );
};

export default CallToAction;
