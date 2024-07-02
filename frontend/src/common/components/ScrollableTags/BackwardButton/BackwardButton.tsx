import Button from "@mui/material/Button";
import React, { RefObject } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LeftArrow from "@mui/icons-material/ArrowCircleLeftOutlined";
import Box from "@mui/material/Box";

interface BackwardButtonProps {
  isAtTop: boolean;
  childRef: RefObject<HTMLDivElement> | null;
}

const BackwardButton: React.FC<BackwardButtonProps> = ({ isAtTop, childRef }) => {
  const scrollLeft = () => {
    if (childRef) {
      if (childRef.current) {
        childRef.current.scrollBy({
          left: -150,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Button
      onClick={scrollLeft}
      sx={{
        display: "contents",
        visibility: isAtTop ? "hidden" : "contents",
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
        <NavigateBeforeIcon />
      </Box>
      {/* <LeftArrow /> */}
    </Button>
  );
};

export default BackwardButton;
