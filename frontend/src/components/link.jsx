import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Links = ({ color, to, onClick, text, className,  }) => {
  return (
    <>
      <Button variant={color} onClick={onClick} className={`ms-2 ${className}`} style={{ textTransform: 'none' }}>
      <Link to={to} className="text-white">
      {text}
      </Link>
      </Button>
    </>
  );
};

export default Links;
