import React, { RefObject, useState } from "react";
import { Box } from "@mui/material";

import TagListContainer from "./TagListContainer/TagListContainer";
import { useScrollbar } from "../../hooks/useScrollbar/useScrollbar";
import BackwardButton from "./BackwardButton/BackwardButton";
import ForwardButton from "./ForwardButton/ForwardButton";

export type Tag = string;

interface ScrollableTagsProps {
  tags: Tag[];
}

const ScrollableTags: React.FC<ScrollableTagsProps> = ({ tags }) => {
  const [childRef, setChildRef] = useState<RefObject<HTMLDivElement> | null>(null);
  const { isAtTop, isAtBottom } = useScrollbar(childRef);

  return (
    <>
      <Box
        id='scrollable-tags'
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
        <BackwardButton
          isAtTop={isAtTop}
          childRef={childRef}
        />

        <TagListContainer
          tags={tags}
          setChildRef={setChildRef}
        />

        <ForwardButton
          isAtBottom={isAtBottom}
          childRef={childRef}
        />
      </Box>
    </>
  );
};

export default ScrollableTags;
