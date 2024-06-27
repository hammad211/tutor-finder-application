import apiService from '../apiService';

const postReviews = (comments, rating, tRegId, cId) => {
  return apiService
    .request('post', '/reviews/reviewInfo', {comments, rating, tRegId, cId})
    .then((res) => {
      return res;
    });
};

const getReview = () => {
  return apiService
    .request('get', '/reviews/reviewInfo')
    .then((res) => {
      return res;
    });
};

export { postReviews, getReview };
