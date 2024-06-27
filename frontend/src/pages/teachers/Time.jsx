import React from 'react';
import Times from "../../components/timeTable/TimeTable";
import TimeStudent from "../../components/timeTableStudent/TimeTable";
import InsertTime from "../../components/InsertTime/insertTimeTable";
import { UseUserInfos } from "../../context/userInfo";

const Time = () => {
  const { userInfo, userValue, userTime } = UseUserInfos(); 

  return (
    <div>
       {(userInfo.role === "teacher" && userTime === "false")&& <InsertTime />}
      {(userInfo.role === "teacher" && userTime === "true") && <Times />}
      {userInfo.role === "student" && userValue === "true" && <TimeStudent />}
    </div>
  );
}

export default Time;
