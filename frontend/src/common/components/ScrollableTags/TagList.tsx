import Box from "@mui/material/Box";
import React from "react";
import { Tag } from "./ScrollableTags";
import Button from "@mui/material/Button";

interface TagListProps {
  tags: Tag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <Box
      id='tag-list'
      sx={{
        display: "flex",
        gap: "8px", // Adjust the gap between tags as needed
        alignItems: "center",
        flexWrap: "nowrap", // Ensure tags stay in a single line
      }}>
      {tags.map((tag, index) => (
        <Button
          key={index}
          variant='outlined'
          sx={{ minWidth: "auto", whiteSpace: "nowrap", borderRadius: "15%" }}>
          {tag}
        </Button>
      ))}
    </Box>
  );
};

export default TagList;
