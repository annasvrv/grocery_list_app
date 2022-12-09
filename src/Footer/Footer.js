import React from "react";
import "./Footer.css";

const Footer = ({ length }) => {
  const today = new Date();
  return (
    <footer>
      <p className="list-length">
        {length} List {length === 1 ? "item" : "items"}
      </p>
      <p className="copyright">Copyright &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
