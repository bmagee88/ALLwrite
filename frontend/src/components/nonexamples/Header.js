import React from "react";
import Button from "react-bootstrap/esm/Button";
import LOGO from "../../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="row justify-content-end bg-dark">
        <div className="col">
          <div className="row">
            <div className="col">
              <Link to="">
                <img className="m-2" src={LOGO} alt="ALLwrite" />
              </Link>
            </div>
            <div className="col">
              <Link to="feedback">
                <Button className="btn-info w-100 m-1">Feedback</Button>
              </Link>
            </div>
            <div className="col">
              <Link to="donate">
                <Button className="btn-warning w-100 m-1">Donate</Button>
              </Link>
            </div>
            <div className="col">
              <Link to="share">
                <Button className="w-100 m-1">Share</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-5">
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
        </div>
      </div>
    </>
  );
};

export default Header;
