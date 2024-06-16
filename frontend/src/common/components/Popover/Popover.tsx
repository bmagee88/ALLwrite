import React, { Children } from "react";
import Box from "@mui/material/Box";
import { Popover as MUIPopover } from "@mui/material";
import "./popover.scss";

const Popover = ({ children: any, content: any }) => {
  const child = Children.toArray(children)[0];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: { currentTarget: React.SetStateAction<null> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Box
        id='clickable-box'
        className='clickable-child-wrapper'
        onClick={handleClick}>
        {child}
      </Box>
      <MUIPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        {content}
      </MUIPopover>
    </Box>
  );
};

export default Popover;
