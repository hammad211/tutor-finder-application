import React from "react";
import Login from "../../components/Authform/login";
import Signup from "../../components/Authform/signup";
import Reset from "../../components/Authform/forgetPassword";
import { useParams } from "react-router-dom";

const AuthPage = () => {
  const { type } = useParams();

  let pageComponent;
  switch (type) {
    case "login":
      pageComponent = <Login />;
      break;
    case "signup":
      pageComponent = <Signup />;
      break;
    case "reset":
      pageComponent = <Reset />;
      break;
    default:
      pageComponent = null;
  }

  return <div>{pageComponent}</div>;
};

export default AuthPage;
