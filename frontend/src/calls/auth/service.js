import apiService from "../apiService";
import jwtDecode from "jwt-decode";

const login = async (email, password, role) => {
  try {
    const res = await apiService.request("post", "/users/login", {
      email,
      password,
      role,
    });

    localStorage.setItem("token", res.token);
    localStorage.setItem("value", res.personalInfo);
    localStorage.setItem("qualifyInfo", res.qualifyInfo);
    localStorage.setItem("image", res.image);
    localStorage.setItem("time", res.time);
    localStorage.setItem("approve", res.approve);
    localStorage.setItem("user", JSON.stringify(res.user));
  
    return res;
  } catch (error) {
    throw error.response.data;
  }
};

const findUser = (resetEmail, roles) => {
  return apiService
    .request("post", "/users/findUser", { resetEmail, roles })
    .then((res) => {
      console.log(res);
      return res;
    });
};

const otpReset = (email,roles,otpvalue,token) => {

  return apiService
    .request("post", "/users/otp", { email,roles,otpvalue,token })
    .then((res) => {
      console.log(res);
      return res;
    });
};

const signup = (email, name, password, roles) => {
  return apiService
    .request("post", "/users/signup", { email, name, password, roles })
    .then((res) => {
      return res;
    });
};

const resetPassword = (resetEmail, roles, resetPassword) => {
  console.log("reser");
  return apiService
    .request("post", "/users/resetPassword", {
      resetEmail,
      roles,
      resetPassword,
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("value");

  window.location.href = "/authPage/login/teacher";
};

const isLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

const getLoggedInRole = () => {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export {
  login,
  findUser,
  signup,
  resetPassword,
  logout,
  isLoggedIn,
  getLoggedInRole,
  otpReset
};
