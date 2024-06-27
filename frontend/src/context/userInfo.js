import React, { createContext, useContext, useEffect, useState } from "react";
const UserInfoContext = createContext();
export const useUserInfoContext = () => useContext(UserInfoContext);
export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userValue, setUserValue] = useState(null);
  const [userTime, setUserTime] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userQualify, setUserQualfy] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedValue = localStorage.getItem("value");
    const storedTime = localStorage.getItem("time");
    const storedImg = localStorage.getItem("image");
    const storedToken = localStorage.getItem("token");
    const storedQualify = localStorage.getItem("qualifyInfo");


    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      const { name, role } = userObject;
      setUserInfo({ user: name, role: role });
    }

    if (storedValue) {
      setUserValue(storedValue);
    }

    if (storedTime) {
      setUserTime(storedTime);
    }
    if(storedImg){
      setUserImage(storedImg)
    }
    if(storedToken){
      setUserToken(storedToken)
    }
    if(storedQualify){
      setUserQualfy(storedQualify)
    }
  }, []);

  const contextValues = {
    userInfo: userInfo || { user: null, role: null },
    userValue: userValue || null,
    userTime: userTime || null,
    userImage: userImage || null,
    userToken: userToken || null,
    userQualify: userQualify || null,
  };

  return (
    <UserInfoContext.Provider value={contextValues}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const UseUserInfos = () => {
  const { userInfo, userValue, userTime, userImage, userToken, userQualify } = useUserInfoContext();
  return { userInfo, userValue, userTime, userImage, userToken, userQualify };
};
