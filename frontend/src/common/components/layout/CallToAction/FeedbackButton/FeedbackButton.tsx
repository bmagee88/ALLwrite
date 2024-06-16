import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const WHERE_TO = "/dashboard/feedback";

const FeedbackButton: React.FC = () => {
  return (
    <Link to={WHERE_TO}>
      <Button
        variant='contained'
        size='small'>
        Feedback
      </Button>
    </Link>
  );
};

export default FeedbackButton;
