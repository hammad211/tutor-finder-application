import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Time from '../../pages/teachers/Time';
import TeacherDashboard from '../../pages/teachers/teacherDashboard';
import TeachersRequest from '../../pages/teachers/requests';
import TeacherHistory from '../../pages/teachers/history';
import TeacherCompleteProfile from '../../pages/teachers/teacherProfile';
import ProfileEdits from '../../pages/teachers/profileEdit';

import QualificationProfile from '../../pages/teachers/qualificationProfile';
import Teacher from '../../pages/teachers/teacher';
import PrivateRoutes from "../../utils/state";
import WatingCard from '../../pages/teachers/Wating';
const TeacherRoutes = () => {
  return (
    <PrivateRoutes>
      <Routes>
        <Route path="teacherDashboard" element={<TeacherDashboard />} />
        <Route path="requests" element={<TeachersRequest />} />
        <Route path="teacherHistory" element={<TeacherHistory />} />
        <Route path="teacherCompleteProfile" element={<TeacherCompleteProfile />} />
        <Route path="profileedits" element={<ProfileEdits />} />

        <Route path="qualificationProfile" element={<QualificationProfile />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="time" element={<Time/>}/>
        <Route path="wait" element={<WatingCard/>}/>

      </Routes>
    </PrivateRoutes>
  );
};

export default TeacherRoutes;
