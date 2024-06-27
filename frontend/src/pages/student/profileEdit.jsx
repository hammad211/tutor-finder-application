import React, { useEffect, useState } from "react";
import EditForms from "../../components/ProfileForm/formEdit";
import { UseUserInfos } from "../../context/userInfo";
import { getPersonals } from "../../calls/student/studentInfo";
import { getPersonalTutor } from "../../calls/tutor/tutorPersonal";

const ProfileEdit = () => {
  const user = UseUserInfos();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (user && user.role) {
          if (user.role === "student") {
            result = await getPersonals();
          } else if (user.role === "teacher") {
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
  }, [user]);

  return (
    <div className="bg-white">
      <p>
        {user && user.role && (
          <EditForms
            profile={
              user.role === "teacher"
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
