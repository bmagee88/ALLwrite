import AnonUserImage from "../../../assets/images/anon_user.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import Box from "@mui/material/Box";
import ProfileMenuItems from "./ProfileMenuItems/ProfileMenuItems";
import BasicAvatar from "../user/BasicAvatar/BasicAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import React from "react";
import Avatar from "../user/NamedColoredAvatar/NamedColoredAvatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

const ProfileMenu: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const fullname = user?.firstname + " " + user?.lastname;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
    // sx={{ display: "flex", alignContent: "center" }}
    >
      <Dropdown>
        {/* <Dropdown.Toggle
          variant=''
          id='dropdown-basic'> */}
        <Avatar name={fullname} />
        {/* <BasicAvatar
            firstName={user?.firstname || "0"}
            lastName={user?.lastname || "0"}
          /> */}
        {/* </Dropdown.Toggle> */}
        <Dropdown.Menu>
          <ProfileMenuItems />
        </Dropdown.Menu>
      </Dropdown>
    </Box>
    // <>
    //   <Tooltip title='Account settings'>
    //     <IconButton
    //       onClick={handleClick}
    //       size='small'
    //       sx={{ ml: 2 }}
    //       aria-controls={open ? "account-menu" : undefined}
    //       aria-haspopup='true'
    //       aria-expanded={open ? "true" : undefined}>
    //       <Avatar name={fullname} />
    //     </IconButton>
    //   </Tooltip>
    //   <Menu
    //     anchorEl={anchorEl}
    //     id='account-menu'
    //     open={open}
    //     onClose={handleClose}
    //     onClick={handleClose}
    //     PaperProps={{
    //       // paper: {
    //       elevation: 0,
    //       sx: {
    //         overflow: "visible",
    //         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    //         mt: 1.5,
    //         "& .MuiAvatar-root": {
    //           width: 32,
    //           height: 32,
    //           ml: -0.5,
    //           mr: 1,
    //         },
    //         "&::before": {
    //           content: '""',
    //           display: "block",
    //           position: "absolute",
    //           top: 0,
    //           right: 14,
    //           width: 10,
    //           height: 10,
    //           bgcolor: "background.paper",
    //           transform: "translateY(-50%) rotate(45deg)",
    //           zIndex: 0,
    //         },
    //         // },
    //       },
    //     }}
    //     transformOrigin={{ horizontal: "right", vertical: "top" }}
    //     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
    //     <ProfileMenuItems handleClose={handleClose} />
    //   </Menu>
    // </>
  );
};

export default ProfileMenu;
