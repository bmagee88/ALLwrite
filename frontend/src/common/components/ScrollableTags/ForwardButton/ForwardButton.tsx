import Button from "@mui/material/Button";
import React, { RefObject } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";

interface BackwardButtonProps {
  isAtBottom: boolean;
  childRef: RefObject<HTMLDivElement> | null;
}

const ForwardButton: React.FC<BackwardButtonProps> = ({ isAtBottom, childRef }) => {
  const scrollRight = () => {
    if (childRef) {
      if (childRef.current) {
        childRef.current.scrollBy({
          left: 150,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Button
      onClick={scrollRight}
      sx={{
        display: "contents",
        visibility: isAtBottom ? "hidden" : "contents",
        transform: "translateY(-50%)",
        padding: "0px",
        margin: "0px",
      }}>
      <Box
        sx={{
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}>
        <NavigateNextIcon />
      </Box>
    </Button>
  );
};

export default ForwardButton;
