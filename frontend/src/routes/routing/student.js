// StudentRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherProfile from '../../pages/student/teachercComplete';
import StudentRequest from '../../pages/student/requests';
import SearchScreen from '../../pages/student/searchScreen';
import HistoryQuery from '../../pages/student/history';
import Proposal from '../../pages/student/proposal';
import Student from '../../pages/student/student';
import Dashboard from '../../pages/student/dashboard';
import ProfileEdits from '../../pages/teachers/profileEdit';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="teachercProfile" element={<TeacherProfile />} />
      <Route path="request" element={<StudentRequest />} />
      <Route path="searchScreen" element={<SearchScreen />} />
      <Route path="history" element={<HistoryQuery />} />
      <Route path="proposal" element={<Proposal />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profileEdit" element={<ProfileEdits />} />
      <Route path="student" element={<Student />} />
    </Routes>
  );
};

export default StudentRoutes;
