import AnonUserImage from "../../../assets/images/anon_user.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import Box from "@mui/material/Box";
import ProfileMenuItems from "./ProfileMenuItems/ProfileMenuItems";
import BasicAvatar from "../user/BasicAvatar/BasicAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProfileMenu = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <Box className='row justify-content-end'>
      <Dropdown>
        <Dropdown.Toggle
          variant=''
          id='dropdown-basic'>
          <BasicAvatar
            firstName={user?.firstname || "0"}
            lastName={user?.lastname || "0"}
          />
          {/* <Box
            component='img'
            sx={{ borderRadius: "50%", width: "2.5rem", height: "auto" }}
            src={AnonUserImage}
            alt=''
            width='25'
          /> */}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <ProfileMenuItems />
        </Dropdown.Menu>
      </Dropdown>
    </Box>
  );
};

export default ProfileMenu;
