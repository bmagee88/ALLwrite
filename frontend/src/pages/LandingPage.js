import React from "react";
import Button from "react-bootstrap/esm/Button";
import LOGO from "../images/logo.png";
import { Link } from "react-router-dom";
// import BrowsePage from "./BrowsePage";

const LandingPage = () => {
  return (
    <>
      <div className="bg-secondary">
        <div className="row align-items-center justify-content-center vh-100 mx-2">
          <div className="col-6 d-none d-sm-block">
            <div className="row justify-content-center p-2">
              <img className="" src={LOGO} alt="ALLwrite" />
            </div>
          </div>
          <div className="col-sm-6 col-xs-12">
            <div className="container bg-light">
              <div className="row small p-2">where everything is...</div>
              <div className="row display-1 p-2">ALLwrite</div>
              <div className="row lead text-muted p-2">
                Join x other readers and writers blah blah blah lorem ispum
                summary stuff.
              </div>
              <div className="row justify-content-end">
                <div className="col-4"></div>
                <div className="col-4">
                  <Link to='/browse'>
                    <Button className="btn-success mb-2 text-nowrap">
                      Wander -{">"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
