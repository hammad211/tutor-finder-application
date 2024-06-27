import React, { useEffect, useState } from "react";
import EditForms from "../../components/ProfileForm/formEdit";
import { UseUserInfos } from "../../context/userInfo";
import { getPersonals } from "../../calls/student/studentInfo";
import { getPersonalTutor } from "../../calls/tutor/tutorPersonal";

const ProfileEdit = () => {
  const { userInfo } = UseUserInfos(); 
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (userInfo && userInfo.role) {
          if (userInfo.role === "student") {
            result = await getPersonals();
          } else if (userInfo.role === "teacher") {
            result = await getPersonalTutor();
            console.log(result);
          }

          if (result) {
            setData(result);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userInfo]);

  return (
    <div className="bg-white">
      <p>
        {userInfo && userInfo.role && (
          <EditForms
            profile={
              userInfo.role === "teacher"
                ? "Teacher Profile Edit"
                : "Student Profile Edit"
            }
            getData={data}
          />
        )}
      </p>
    </div>
  );
};

export default ProfileEdit;
