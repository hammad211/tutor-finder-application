import DashboardData from "../../components/dashboard/Dashboard";
import { getRequest } from "../../calls/requests/res";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
 
  const [search, setSearch] = useState("");
  const [selectedSlot, setSelectedSlots] = useState([]);
  const [tutorInfo, setTutorInfo] = useState([]);
  const [count, setCount ] = useState("");
  const type = "Student";

  const getRequests = async () => {
    try {
      const res = await getRequest(search);
      if (res.data) {
        setCount(res.requestCounts|| {})
        setSelectedSlots(res.data.selectedSlots || {});
        setTutorInfo(res.data.tutorInfo || {});
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div>
      <DashboardData
        tutorInfo={tutorInfo} 
        selectedSlot={selectedSlot} 
        showButton={true}
        count={count}
        userType={type}
      />
    </div>
  );
};

export default Dashboard;
