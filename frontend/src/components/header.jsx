import React from "react";
import Buttons from "./Button/button";
const Header = ({ text, button1, button2 }) => {
  return (
    <div className="bg-body-tertiary">
      <br></br>
      <br></br>

      <div className="top-ml d-flex">
        <h1 className=" fs-9 font-weight-bold d-inline dashboard-left text-secondary">
          {text}
        </h1>

        <div className="button-space d-flex flex-direction-row w-25">
          <Buttons
            variant="outline-secondary"
            text={button1}
            className="ms-2 w-75 p-2"
            size="lg"
          />
          <Buttons
            variant="outline-warning"
            text={button2}
            className="ms-2 w-75 p-4 align-self-end bg-warning text-secondary"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
