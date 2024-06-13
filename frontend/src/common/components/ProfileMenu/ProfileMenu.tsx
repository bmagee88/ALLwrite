import AnonUserImage from "../../../assets/images/anon_user.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import Box from "@mui/material/Box";
import ProfileMenuItems from "./ProfileMenuItems/ProfileMenuItems";

const ProfileMenu = () => {
  return (
    <>
      <Box>
        <div className='row justify-content-end'>
          <Dropdown className='bg-light rounded w-auto'>
            <Dropdown.Toggle
              variant=''
              id='dropdown-basic'>
              <img
                src={AnonUserImage}
                alt=''
                width='25'
                className='rounded m-1'
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ProfileMenuItems />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Box>
    </>
  );
};

export default ProfileMenu;
