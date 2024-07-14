import Box from "@mui/material/Box";
import React, { ReactNode } from "react";

interface AdjustmentProps {
  children: ReactNode;
  flipVertical?: boolean;
  flipHorizontal?: boolean;
}

const Adjustment: React.FC<AdjustmentProps> = ({ children, flipVertical, flipHorizontal }) => {
  return <Box sx={{ transform: "scaleX(-1)" }}>{children}</Box>;
};

export default Adjustment;
