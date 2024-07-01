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
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        scrollbarWidth: "none", // Hides scrollbar on Firefox
        msOverflowStyle: "none", // Hides scrollbar on IE and Edge
        "&::-webkit-scrollbar": {
          display: "none", // Hides scrollbar on Chrome and Safari
        },
      }}
      ref={containerRef}>
      <TagList tags={tags} />
    </Box>
  );
};

export default TagListContainer;
