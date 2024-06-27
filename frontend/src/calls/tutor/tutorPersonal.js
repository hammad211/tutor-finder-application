import apiService from '../apiService';

const postPersonalTutor = (t_name, t_lname,t_address,t_city, t_gender, number,subject,price,about,coordinates) => {
  return apiService
    .request('post', '/tutor/personalInfo', { t_name, t_lname,t_address,t_city, t_gender, number, subject,price,about,coordinates  })
    .then((res) => {
   
  localStorage.setItem("value", res.data);
      if(res.updatedUser){
      localStorage.setItem('user', JSON.stringify(res.updatedUser));
    }
      return res;
    });
};

const updatePersonalTutor = (t_name, t_lname,t_address,t_city, t_gender, number,subject,price,about,coordinates) => {
  return apiService
    .request('put', '/tutor/personalInfo', { t_name, t_lname,t_address,t_city, t_gender, number,subject,price,about,coordinates  })
    .then((res) => {
      return res;
    });
};

const getPersonalTutor = () => {
  return apiService
    .request('get', '/tutor/comment')
    .then((res) => {
      return res;
    });
};

const getComment = () => {
  return apiService
    .request('get', '/tutor/comment')
    .then((res) => {
      return res;
    });
};

export { postPersonalTutor, getPersonalTutor, updatePersonalTutor, getComment };
