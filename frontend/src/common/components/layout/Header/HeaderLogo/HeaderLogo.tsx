import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../../../../assets/images/logo.png";

const HeaderLogo: React.FC = () => {
  return (
    <div className=''>
      <Link to='/dashboard/browse'>
        <img
          src={LOGO}
          alt='ALLwrite'
          width={100}
        />
      </Link>
    </div>
  );
};

export default HeaderLogo;
