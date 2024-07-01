import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import TruncateTextContext from "../contexts/TruncateTextContext";
import { TruncatedTextProps } from "../interfaces/truncate-text.interface";

const ShowMore: React.FC = () => {
  const { isTruncated, expandButtonStyles, isReadingMore, lessText, moreText, setIsReadingMore } =
    useContext(TruncateTextContext) as TruncatedTextProps;

  return (
    isTruncated && (
      <Typography
        sx={{ ...(expandButtonStyles || { fontWeight: "bold" }) }}
        component={"span"}
        onClick={() => setIsReadingMore((prev) => !prev)}>
        {isReadingMore ? lessText : moreText}
      </Typography>
    )
  );
};

export default ShowMore;
