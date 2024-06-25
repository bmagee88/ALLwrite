import Button from "@mui/material/Button";
import React, { RefObject } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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
      <NavigateBeforeIcon />
    </Button>
  );
};

export default BackwardButton;
