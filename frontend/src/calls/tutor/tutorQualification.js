import apiService from '../apiService';

const getQualifications = () => {
  return apiService
    .request('get', '/tutor/qualificationInfo')
    .then((res) => {
      return res;
    });
};

const postQualification = (degreeName, degreeType,institue, city,year,yearEnd, image) => {
  return apiService
    .request('post', '/tutor/qualificationInfo', { degreeName, degreeType,institue, city,year,yearEnd,image})
    .then((res) => {
      localStorage.setItem("qualifyInfo", res.data);
      return res;
    });
};

const updateQualification = (degreeName, degreeType,institue, city,year,yearEnd,id, image) => {

  return apiService
    .request('put', '/tutor/qualificationInfo', { degreeName, degreeType,institue, city,year,yearEnd,id,image})
    .then((res) => {
      return res;
    });
};

const deleteQualifyTutor = (id) => {
  return apiService
    .request('delete', '/tutor/qualificationInfo/'+id)
    .then((res) => {
      return res;

    });
};


export { getQualifications, postQualification,updateQualification,deleteQualifyTutor };
