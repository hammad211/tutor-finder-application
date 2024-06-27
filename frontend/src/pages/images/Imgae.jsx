import React from "react";
import { useNavigate } from "react-router-dom";

import ImageComponent from "../../components/Image/image";
const AddressForms = ({ profile, getData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-100 mt-5">
      <div className="top-ml">
        <br />
        <br />
        <h1 className=" ms-5 ms-5 font-weight-bold SubfrmH1">{profile}</h1>
        {/* <h3 className=" ms-5 text-secondary dashH1 mt-5"> Dashboard/Image </h3> */}
      </div>

      <ImageComponent data={"Profile Image"} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default AddressForms;
