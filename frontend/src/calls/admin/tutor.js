import apiService from '../apiService';

const postPersonalTutor = (changes,t_reg_id,type) => {
    console.log("changes", changes)
  return apiService
    .request('post', '/admin/personalInfo', { changes,t_reg_id,type  })
    .then((res) => {
      return res;
    });
};

const getResponse = (id) => {
  console.log("id",id)
  return apiService
  .request( 'get', `/admin/response/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error('Error fetching personal tutor:', error);
      throw error;
    });
};

const approveTutor = (t_reg_id) => {
  return apiService
    .request('put', '/admin/personalInfo', {t_reg_id})
    .then((res) => {
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
    .request('get', '/admin/personalInfo')
    .then((res) => {
        console.log(res);
      return res;
    });
};




export { postPersonalTutor, getPersonalTutor, updatePersonalTutor,approveTutor, getResponse };