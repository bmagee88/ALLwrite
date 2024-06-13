import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { menu_items } from "./config";
import SelectableIcon from "../SelectableIcon/SelectableIcon";

const ControlPanel: React.FC = () => {
  const [selected, setSelected] = useState<number>(2);

  const onClick = (e) => {
    setSelected(e.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: ".5rem",
        boxShadow: "0 4px 8px -2px lightgray",
      }}>
      {menu_items.map((item, index) => {
        return (
          <Box
            key={item.label}
            sx={{
              paddingY: ".5rem",
              paddingX: "1rem",

              // ...(index === 2 && {
              //   border: "2px solid black",
              //   borderRadius: "25%",
              //   width: "6rem",
              //   padding: ".5rem",
              // }),
            }}>
            <Link
              href='/browse' //{item.link}
              // href='/'
              underline='none'
              variant='body2'
              color={"secondary"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#2f2f2f",
                }}>
                {/* <item.icon isSelected={index === selected} /> */}
                <SelectableIcon
                  isSelected={index === selected}
                  selectedIcon={item.selectedIcon}
                  unselectedIcon={item.unselectedIcon}
                />

                <Typography
                  sx={{
                    display: "none",
                    "@media (min-width:640px)": {
                      display: "block",
                    },
                  }}>
                  <Box
                    component={"span"}
                    sx={{
                      whiteSpace: "nowrap",
                    }}>
                    {item.label} {selected}
                  </Box>
                </Typography>
              </Box>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default ControlPanel;
