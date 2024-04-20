import React from "react";
import { Link } from "react-router-dom";
import AnonUserImage from "../../images/anon_user.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
// import session_data from "../../test/session";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown } from 'react-bootstrap';

const ProfileMenu = () => {
  // const ACTIVE_USER = session_data.user_id;
  //display icont
  //click to open dropdown
  //dropdown list includes; My account, My Profile, My Settings, My Covers, My Pages, My Bookmarks, Logout
  return (
    <>
      <div className='text-white w-auto mx-2'>hellow, {sessionStorage.getItem("username")}</div>
      <div className='row justify-content-end'>
        <Dropdown className='bg-light rounded w-auto'>
          <Dropdown.Toggle
            variant=''
            id='dropdown-basic'>
            <img
              src={AnonUserImage}
              alt=''
              height='25'
              width='25'
              className='rounded m-1'></img>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to='account'>
              Account
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to={`profile/${sessionStorage.getItem("user_id")}`}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='my-bookmarks'>
              My Bookmarks
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='my-covers'>
              My Covers
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='my-pages'>
              My Pages
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='settings'>
              Settings
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to='logout'>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default ProfileMenu;
