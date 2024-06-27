import React from "react";
import { Backspace, Cursor, Delay, Speed } from "react-typing-animation";

const TypingAnimation = () => {
  return (
    <div>
      {/* Text */}
      <span>
        <Speed ms={100}>
          Hello,
          <Delay ms={500} />
        </Speed>
      </span>
      <br />

      {/* Typing Animation */}
      <Speed ms={50}>
        <span>
          Typing animation
          <Cursor />
        </span>
        <Backspace count={18} />
        <span>
          Another message
          <Cursor />
        </span>
        <Delay ms={2000} />
        <Backspace count={16} />
      </Speed>
    </div>
  );
};

export default TypingAnimation;
