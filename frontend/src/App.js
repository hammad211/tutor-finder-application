// App.js
import React from 'react';
import Routes from "./routes/index"
import 'react-toastify/dist/ReactToastify.css';
import { UserInfoProvider } from "./context/userInfo";
import { QualificationProvider } from "./context/qualifyContext";

function App() {
  return (
    <UserInfoProvider>
    <QualificationProvider>
    <Routes/>
    </QualificationProvider>
    </UserInfoProvider>
    
  );
}

export default App;