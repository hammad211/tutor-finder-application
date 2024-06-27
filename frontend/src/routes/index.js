// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Header from "../pages/navbar/header";
// import SubNav from "../pages/navbar/subHeader";
// import PrivateRoutes from "../utils/state";
// import Footer from "../components/footer";
// import Home from "../pages/homee/home";
// import AuthPage from "../pages/user/authPage";
// import ChatDashboard from "../chats/chat";
// import ProfileEdits from "../pages/student/profileEdit";
// import StudentRoutes from "./routing/student";
// import TeacherRoutes from "./routing/teacher";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { UseUserInfos } from "../context/userInfo";
// import Image from "../pages/images/Imgae";
// import Review from "../pages/review/review";
// import Admin from "../pages/admin/Admin";

// function App() {
//   const [isShow, setShow] = useState(false);
//   const { userInfo, userValue, userTime, userImage, userToken } = UseUserInfos();

//   useEffect(() => {
//     if (userInfo) {
//       if (userInfo.role === "teacher" && userTime === "true") {
//         setShow(true);
//       } else if (userInfo.role === "student" && userImage === "true") {
//         setShow(true);
//       }
//     }
//   }, [userInfo, userValue, userTime, userImage]);

//   return (
//     <Router>
//       <ToastContainer />
//       <Header />
//       {isShow && <SubNav />}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <PrivateRoutes>
//               {" "}
//               <Home />
//             </PrivateRoutes>
//           }
//         />
//         <Route path="/home" element={<Home />} />
//         <Route path="/authPage/:type/:role" element={  <AuthPage />} />
//         <Route path="/profileEdits" element={<ProfileEdits />} />

//         <Route path="/teachers/*" element={
//          <PrivateRoutes>
//          {" "}
//          <TeacherRoutes />
//        </PrivateRoutes>
//       } />

// <Route path="/student/*" element={
//          <PrivateRoutes>
//          {" "}
//          <StudentRoutes />
//        </PrivateRoutes>
//       } />


//         <Route path="/chats/*" element={<ChatDashboard />} />
//         <Route path="/image" element={<Image />} />
//         <Route path="/review" element={<Review />} />
//         <Route path="/admin" element={<Admin />} />
//       </Routes>
//       {/* <Footer /> */}
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../pages/navbar/header";
import SubNav from "../pages/navbar/subHeader";
import PrivateRoutes from "../utils/state";
import Footer from "../components/footer";
import Home from "../pages/homee/home";
import AuthPage from "../pages/user/authPage";
import ChatDashboard from "../chats/chat";
import ProfileEdits from "../pages/student/profileEdit";
import StudentRoutes from "./routing/student";
import TeacherRoutes from "./routing/teacher";
import "bootstrap/dist/css/bootstrap.min.css";
import { UseUserInfos } from "../context/userInfo";
import Image from "../pages/images/Imgae";
import Review from "../pages/review/review";
import Admin from "../pages/admin/Admin";

function App() {
  const [isShow, setShow] = useState(false);
  const { userInfo, userTime, userImage } = UseUserInfos();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "teacher" && userTime === "true") {
        setShow(true);
      } else if (userInfo.role === "student" && userImage === "true") {
        setShow(true);
      }
    }
  }, [userInfo, userTime, userImage]);

  return (
    <Router>
      <ToastContainer />
      <Header />
      {isShow && <SubNav />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/authPage/:type/:role" element={<AuthPage />} />
        <Route path="/home" element={<PrivateRoutes> <Home /> </PrivateRoutes>}/>

        <Route path="/profileEdits" element={<PrivateRoutes> <ProfileEdits /> </PrivateRoutes>}/>
        <Route path="/teachers/*"element={<PrivateRoutes> <TeacherRoutes /> </PrivateRoutes>}/>
        <Route path="/student/*" element={<PrivateRoutes><StudentRoutes /> </PrivateRoutes> }/>
        <Route path="/chats/*" element={ <PrivateRoutes> <ChatDashboard /></PrivateRoutes>} />
        <Route path="/image" element={<PrivateRoutes> <Image /> </PrivateRoutes>}/>
        <Route path="/review" element={ <PrivateRoutes><Review /> </PrivateRoutes> }/>
        <Route path="/admin" element={ <PrivateRoutes><Admin/> </PrivateRoutes> }/>
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;

