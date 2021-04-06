import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        {`© ${new Date().getFullYear()} WinAway Limited. All rights reserved.`}
      </p>
    </div>
  );
};

export default Footer;
