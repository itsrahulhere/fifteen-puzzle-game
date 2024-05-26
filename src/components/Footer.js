import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={linkStyle}>
        <FaLinkedin style={{ ...iconStyle, color: "#0077b5" }} />
        <a
          href="https://www.linkedin.com/in/itsrahulhere/"
          style={textStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          @itsrahulhere
        </a>
      </div>
      <div style={linkStyle}>
        <FaGithub style={{ ...iconStyle, color: "#171515" }} />
        <a
          href="https://github.com/itsrahulhere"
          style={textStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          @itsrahulhere
        </a>
      </div>
    </footer>
  );
};

const footerStyle = {
  position: "fixed",
  bottom: "20px",
  left: "0",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  // backgroundColor: "#f1f1f1",
  // borderTop: "1px solid #e1e1e1",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  margin: "0 20px",
};

const iconStyle = {
  marginRight: "8px",
  fontSize: "24px",
};

const textStyle = {
  textDecoration: "none",
  color: "black",
  fontSize: "18px",
};

export default Footer;
