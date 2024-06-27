import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoutes = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const hasNavigated = useRef(false); // Use ref to track if navigation has occurred

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const tokenAvailable = localStorage.getItem("token");

    if (storedUser && tokenAvailable) {
      const userObject = JSON.parse(storedUser);
      setUser(userObject);

      const isStudent = userObject.role === "student";
      const isTeacher = userObject.role === "teacher";
      const isAdmin = userObject.role === "admin";
      const storedValue = localStorage.getItem("value");
      const storedImg = localStorage.getItem("image");
      const storedQualification = localStorage.getItem("qualifyInfo");
      const storedTime = localStorage.getItem("time");
      const approve = localStorage.getItem("approve");

      if (isStudent) {
        if (storedValue === "false") {
          navigate("/student/student");
        } else if (storedImg === "false") {
          navigate("/image");
        }
      } else if (isTeacher) {
        if (storedValue === "false") {
          navigate("/teachers/teacher");
        } else if (storedImg === "false") {
          navigate("/image");
        } else if (storedQualification === "false") {
          navigate("/teachers/qualificationProfile");
        } else if (storedTime === "false") {
          navigate("/teachers/time");
        } else if(approve === "false") {
          navigate("/teachers/wait");
        }
      }
      else if (isAdmin) {
          navigate("/admin");
      }
    } else {
      if (!hasNavigated.current){
        hasNavigated.current = true;
        navigate("/authPage/login/student");
        toast.error("Login Required!", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    }
  }, [navigate]);

  return (
    <div className="state-container" style={{ height: "100vh" }}>
      {user && children}
    </div>
  );
};

export default PrivateRoutes;
