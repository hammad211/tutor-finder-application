import React, { createContext, useContext, useState } from "react";

const QualificationContext = createContext();

export const QualificationProvider = ({ children }) => {
  const [selectedQualification, setSelectedQualification] = useState(null);

  const updateSelectedQualification = (qualification) => {
    setSelectedQualification(qualification);
  };
  const clearQualification = () => {
    setSelectedQualification(null);
  };
  
  return (
    <QualificationContext.Provider value={{ selectedQualification, updateSelectedQualification,clearQualification }}>
      {children}
    </QualificationContext.Provider>
  );
};

export const useQualificationContext = () => {
  return useContext(QualificationContext);
};
