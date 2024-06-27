import apiService from "../apiService";

const postReq = (matchedSlots,studentId) => {
  console.log(matchedSlots,studentId)
  return apiService
    .request('post', '/request/reqInfo', { matchedSlots,studentId})
    .then((res) => {
      return res;
    });
};

const getRequest = (search) => {
  // const encodedParams = {};

  // if (Array.isArray(search)) {
  //   encodedParams.searchTerm = search.map((value) => encodeURIComponent(value));
  // } else if (typeof search === 'string') {
  //   // If search is a string, treat it as a single parameter
  //   encodedParams.searchTerm = [encodeURIComponent(search)];
  // }

  // console.log('Encoded parameters:', encodedParams);

  // const queryString = Object.keys(encodedParams)
  //   .map((key) => `${key}=${encodedParams[key].join(',')}`)
  //   .join('&');

  return apiService
    .request('get', `/request/reqInfo3`)
    .then((res) => {
      return res;
    });
};

const getStudent = (search) => {
  return apiService
    .request('get', '/student/getAllTimeSlots')
    .then((res) => {
      console.log(res)
      return res;
    });
};

const updateReq = (slots, id) => {
  return apiService
    .request('put', '/request/reqInfo', { slots, id })
    .then((res) => {
      return res.data;
    });
};

const deleteReq = (id) => {
  return apiService.request('delete', '/request/reqInfo', { id  })
    .then((res) => {
      console.log('Response from deleteReq:', res.data);
      return res;
    })
    .catch((error) => {
      console.error('Error in deleteReq:', error);
      throw error;
    });
};

const completeReq = (id) => {
  return apiService.request('post', '/request/reqInfoComplete', { id  })
    .then((res) => {
      console.log('Response from deleteReq:', res.data);
      return res;
    })
    .catch((error) => {
      console.error('Error in deleteReq:', error);
      throw error;
    });
};

export { postReq, getRequest, updateReq, deleteReq,getStudent, completeReq };
