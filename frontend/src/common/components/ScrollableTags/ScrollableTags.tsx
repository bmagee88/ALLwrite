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
      {/* <Box
        id='scrollable-tags'
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
        <Box
          sx={{
            paddingLeft: ".25rem",
          }}>
          <BackwardButton
            isAtTop={isAtTop}
            childRef={childRef}
          />
        </Box>

        <TagListContainer
          tags={tags}
          setChildRef={setChildRef}
        />
        <Box
          sx={{
            paddingRight: ".25rem",
          }}>
          <ForwardButton
            isAtBottom={isAtBottom}
            childRef={childRef}
          />
        </Box>
      </Box> */}
      <Box
        id='scrollable-tags'
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            flexGrow: 1,
            overflow: "auto",
            paddingX: "1.5rem",
          }}>
          <Box
            id='gradient-to-right'
            sx={{
              position: "absolute",
              left: "0",
              width: "20%",
              height: "100%",
              background: !isAtTop
                ? "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%)"
                : "none",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none", // Let clicks pass through to the button underneath
              // marginLeft: "1rem",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              left: 0,
              zIndex: 2,
              paddingLeft: ".25rem",
            }}>
            <BackwardButton
              isAtTop={isAtTop}
              childRef={childRef}
            />
          </Box>
          <TagListContainer
            tags={tags}
            setChildRef={setChildRef}
          />

          <Box
            id='gradient-to-left'
            sx={{
              position: "absolute",
              right: "1rem",
              width: "20%",
              height: "100%",
              background: !isAtBottom
                ? "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0) 100%)"
                : "none",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none", // Let clicks pass through to the button underneath
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              right: 0,
              zIndex: 2,
              paddingRight: ".25rem",
            }}>
            <ForwardButton
              isAtBottom={isAtBottom}
              childRef={childRef}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ScrollableTags;
