import React from "react";
import './Footer.css';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open("https://www.whatsapp.com", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com", "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com", "_blank");
  };

  const handleTwitterClick = () => {
    window.open("https://www.twitter.com", "_blank");
  };

  return (
    <div className="footer">
      <div className="copyright">
        <h2>@2023 Sciqus Infotech Pvt Ltd, All Rights Reserved</h2>
      </div>
      <div className="socialsites">
        <FaWhatsapp className="icon" onClick={handleWhatsAppClick} />
        <FaInstagram className="icon" onClick={handleInstagramClick} />
        <FaFacebook className="icon" onClick={handleFacebookClick} />
        <FaLinkedin className="icon" onClick={handleLinkedInClick} />
        <FaTwitter className="icon" onClick={handleTwitterClick} />
      </div>
    </div>
  );
};

export default Footer;
