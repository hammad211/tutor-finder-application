import apiService from '../apiService';

const getPersonals = () => {
  return apiService
    .request('get', '/student/studentInfo')
    .then((res) => {
      return res;
    });
};

const postPersonal = (s_fname, s_lname, s_gender, s_number, s_address, s_city,coordinates) => {  
  return apiService
    .request('post', '/student/studentInfo', { s_fname, s_lname, s_gender, s_number, s_address, s_city,coordinates })
    .then((res) => {
      localStorage.setItem("value", res.data);
      return res;
    });
};

const updatePersonal = (s_fname, s_lname, s_gender, s_number, s_address, s_city,coordinates) => {
  return apiService
    .request('put', '/student/studentInfo', { s_fname, s_lname, s_gender, s_number, s_address, s_city,coordinates })
    .then((res) => {
      return res;
    });
};

const getQualification = () => {
  return apiService
    .request('get', '/student/qualificationInfo')
    .then((res) => {
      return res;
    });
};

const getPersonalTutor = (arrayOfObjects = [], search = '', page = 1) => {
  const queryParams = new URLSearchParams();

  if (Array.isArray(arrayOfObjects)) {
    arrayOfObjects.forEach((obj) => {
      if (obj && typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, value);
          }
        });
      }
    });
  }

  if (search) {
    queryParams.append("search", search);
  }

  const pageNumber = parseInt(page, 10);
  if (!isNaN(pageNumber)) {
    queryParams.append("page", pageNumber);
  }

  const queryString = queryParams.toString();

  return apiService
    .request('get', `/student/personalInfo?${queryString}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error('Error fetching personal tutor info:', error);
      // Handle error accordingly, e.g., return a default value or rethrow the error
      throw error;
    });
};


const getDate = (t_reg_id) => {
  return apiService
    .request('get', `/student/timeInfo/${t_reg_id}`)
    .then((res) => {
      return res;
    });
};

const getRequest = (search) => {
  // const encodedParams = {};

  // if (Array.isArray(search)) {
  //   encodedParams.searchTerm = search.map((value) => encodeURIComponent(value));
  // } else if (typeof search === 'string') {
  //   encodedParams.searchTerm = [encodeURIComponent(search)];
  // }

  // const queryString = Object.keys(encodedParams)
  //   .map((key) => `${key}=${encodedParams[key].join(',')}`)
  //   .join('&');

  return apiService
    .request('get', '/student/getAllTimeSlots3')
    .then((res) => {
      return res;
    });
};

const getDates = (search) => { 
  return apiService
    .request('get', '/student/getAllTimeSlots')
    .then((res) => {
      return res;
    });
};

const getImages = (id) => {
  console.log(id);
  return apiService
    .request('get', `/picture/imgInfo/${id}`)
    .then((res) => {
      return res;
    });
};


const getDatas = (t_reg_id) => {
  return apiService
    .request('post', '/student/getTutorData', { t_reg_id })
    .then((res) => {
      return res;
    });
};

const getReviews = () => {
  return apiService
    .request('get', '/reviews/reviewStudent')
    .then((res) => {
      return res;
    });
};


const getSelectedSlots = (id) => {
  console.log(id)
  return apiService
    .request('get', `/student/timeInfoStudent?id=${id}`)
    .then((res) => {
      console.log(res);
      return res;
    });
};

const postTimeReq = (clickedSlots,subject,id) => {
  console.log(id)
  return apiService
    .request('post', '/student/postTime', {clickedSlots,subject,id})
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    });
};





export { getPersonals,updatePersonal, postPersonal,getReviews, getImages,  getQualification, getPersonalTutor, getDate, getRequest, getDatas,getSelectedSlots,postTimeReq,getDates };
