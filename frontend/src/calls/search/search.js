import apiService from '../apiService';

const getPersonal = () => {
  return apiService
    .request('get', '/student/studentInfo')
    .then((res) => {
      return res;
    });
};

const postSearch = (subject, location) => {
  return apiService
    .request('post', '/search/searchInfo', { location, subject })
    .then((res) => {
      return res;
    });
};



export { getPersonal, postSearch };
