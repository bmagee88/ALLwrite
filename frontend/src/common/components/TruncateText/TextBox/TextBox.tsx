import Box from "@mui/material/Box";
import { useContext } from "react";
import TruncateTextContext from "../contexts/TruncateTextContext";
import { TruncatedTextProps } from "../interfaces/truncate-text.interface";

const TextBox: React.FC = () => {
  const { id, lineHeight, isReadingMore, maxLines, ref, text } = useContext(
    TruncateTextContext
  ) as TruncatedTextProps;
  return (
    <Box
      id={id}
      sx={{
        overflowWrap: "break-word",
        width: "300px",
        lineHeight: lineHeight,
        ...(!isReadingMore
          ? {
              maxHeight: `calc(${lineHeight} * ${maxLines})`,
              overflow: "hidden",
            }
          : {}),
      }}
      ref={ref}>
      {text}
    </Box>
  );
};

export default TextBox;
