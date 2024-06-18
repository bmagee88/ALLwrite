import Box from "@mui/material/Box";
import React, { useEffect, useRef } from "react";
import { Tag } from "../ScrollableTags";
import TagList from "../TagList";

interface TagListContainerProps {
  tags: Tag[];
  setChildRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement> | null>>;
}

const TagListContainer: React.FC<TagListContainerProps> = ({ tags, setChildRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setChildRef(containerRef);
  }, [containerRef, setChildRef]);
  return (
    <Box
      id='scrollable-container'
      sx={{
        width: "100%",
        // height: "48px",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        //   position: "relative",
        //   WebkitOverflowScrolling: "touch", // Enables smooth scrolling on iOS
        scrollbarWidth: "none", // Hides scrollbar on Firefox
        msOverflowStyle: "none", // Hides scrollbar on IE and Edge
        "&::-webkit-scrollbar": {
          display: "none", // Hides scrollbar on Chrome and Safari
        },
        // "&::after": {
        //   content: '""',
        //   position: "absolute",
        //   top: 0,
        //   right: 0,
        //   width: "16px",
        //   height: "100%",
        //   background: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
        //   pointerEvents: "none",
        // },
        //   display: "flex",
        //   alignItems: "center",
        //   minWidth: "100%", // Ensure full width scrollable area
        //   minHeight: "100%", // Ensure full height scrollable area
        //   flex: "1 1 auto", // Allow flex to grow and shrink as needed
        //   overflow: "auto", // Enable overflow scrolling
        //   "-webkit-overflow-scrolling": "touch", // Smooth scrolling on iOS
        //   touchAction: "pan-y", // Enables vertical scrolling on touch devices
      }}
      ref={containerRef}>
      <TagList tags={tags} />
    </Box>
  );
};

export default TagListContainer;
