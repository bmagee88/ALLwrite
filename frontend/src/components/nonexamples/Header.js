import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import LOGO from "../../images/logo.png";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [hasActiveUser, setHasActiveUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setHasActiveUser(true);
    } else {
      setHasActiveUser(false);
    }
  }, []);

  return (
    <>
      <div className="row bg-dark">
        <div className="col">
          <Link to="">
            <img className="m-2" src={LOGO} alt="ALLwrite" />
          </Link>
        </div>

        <div className="col-auto">
          <Link to="feedback">
            <Button className="btn-info w-100 m-1">Feedback</Button>
          </Link>
        </div>

        <div className="col-auto">
          <Link to="donate">
            <Button className="btn-warning w-100 m-1">Donate</Button>
          </Link>
        </div>

        <div className="col-auto">
          <Link to="share">
            <Button className="w-100 m-1">Share</Button>
          </Link>
        </div>

        <div className="col-auto">
          {!hasActiveUser && (
            <div className="row justify-content-end">
              <div className="col-auto m-1">
                <Link to="register">
                  <Button className="btn-info btn-sm">
                    <span className="text-nowrap">Join Us</span>
                  </Button>
                </Link>
              </div>
              <div className="col-auto m-1">
                <Link to="login">
                  <Button className="btn-info btn-sm">
                    <span className="text-nowrap">Check In</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {hasActiveUser && <ProfileMenu />}
        </div>
      </div>
    </>
  );
};

export default Header;
