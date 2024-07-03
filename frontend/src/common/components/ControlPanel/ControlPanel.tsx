import { Box, Typography } from "@mui/material";
// import { Link } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { MenuItem } from "./config";
import SelectableIcon from "../SelectableIcon/SelectableIcon";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelected } from "../../store/nav/navSlice";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
interface Placement {
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}
interface Animation {
  zIndex?: number;
  transition?: string;
  transform?: string;
}

interface Styles {
  backgroundColor: string;
}

interface Sizing {
  height?: string;
  width?: string;
}
interface ControlPanelProps {
  items: MenuItem[];
  justifyContent?: string;
  backgroundColor?: string;
  sizing?: Sizing;
  placement?: Placement;
  animation?: Animation;
  styles?: Styles;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  items,
  justifyContent = "space-between",
  backgroundColor = "white",
  sizing = {},
  placement = {},
  animation = {},
  styles = {},
}) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.nav.selectedItem);
  console.log("selected", selected);

  return (
    <Box
      sx={{
        ...sizing,
        ...placement,
        ...styles,
        ...animation,
        display: "flex",
        justifyContent: justifyContent,
        backgroundColor: backgroundColor,
        marginTop: ".5rem",
        boxShadow: "0 4px 8px -2px lightgray",
      }}>
      {items.map((item) => {
        return (
          <Box
            key={item.label}
            sx={{
              paddingY: ".5rem",
              paddingX: "1rem",
            }}
            onClick={() => {
              return dispatch(setSelected(item.label));
            }}>
            <StyledLink to={item.link}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#2f2f2f",
                }}>
                <SelectableIcon
                  isSelected={item.label === selected}
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
