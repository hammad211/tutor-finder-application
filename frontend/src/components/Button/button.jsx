import React from "react";
import Button from 'react-bootstrap/Button';

const Buttons = ({  onClick, text, className,variant, size }) => {
  
  
  return (
    <>
      <Button size={size} variant={variant} onClick={onClick} className={`mb-2 ${className}`} style={{textTransform:"none"  }}>
      {text}
    </Button>
    </>
  );
};

export default Buttons;
