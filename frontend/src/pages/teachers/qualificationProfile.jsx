import React from "react";
import Qualify from "../../components/Qualifyform/qualificationForm";
import { useQualificationContext } from "../../context/qualifyContext";

const Qualification = () => {
  const { selectedQualification } = useQualificationContext();
  const isUpdating = !!selectedQualification;
   
  return (
    <>
      <Qualify
        profile={isUpdating ? "Edit Qualification" : "Add Qualification"}
        isUpdating={isUpdating}
        data={selectedQualification}
      />
    </>
  );
};

export default Qualification;
