import { Box, Typography } from "@mui/material";
// import { Link } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { menu_items } from "./config";
import SelectableIcon from "../SelectableIcon/SelectableIcon";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ControlPanel: React.FC = () => {
  const [selected, setSelected] = useState<number>(2);

  const onClick = (index: number) => {
    setSelected(index);
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
            }}
            onClick={() => onClick(index)}>
            <StyledLink to={item.link}>
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
                    {item.label}
                  </Box>
                </Typography>
              </Box>
            </StyledLink>
          </Box>
        );
      })}
    </Box>
  );
};

export default ControlPanel;
