import apiService from '../apiService';

const getReview = () => {
  return apiService
    .request('get', '/home/getreview')
    .then((res) => {
      return res;
    });
};

export {  getReview };