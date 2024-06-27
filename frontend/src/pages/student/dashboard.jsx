import React, { useState, useEffect } from "react";
import { getRequest } from "../../calls/student/studentInfo";
import Dashboard from "../../components/dashboard/Dashboard";

const DashboardData = () => {
  const [selectedSlot, setSelectedSlots] = useState({});
  const [search, setSearch] = useState("");
  const [tutorInfo, setTutorInfo] = useState([]);
  const [count, setCount ] = useState("");
  const type = "Tutor";

  const getRequests = async () => {
    try {
      const res = await getRequest(search);
      if (res.data) {
        console.log(res.data)
        setSelectedSlots(res.data.selectedSlots || {});
        setCount(res.requestCounts|| {})
        setTutorInfo(res.data.tutorInfo || {});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    getRequests();
  },[]);

  return (
    <>
      <div>
      <Dashboard
        tutorInfo={tutorInfo} 
        selectedSlot={selectedSlot} 
        count={count}
        userType={type}
      />
    </div>
    </>
  );
};

export default DashboardData;


