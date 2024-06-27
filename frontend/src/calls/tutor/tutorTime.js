import apiService from '../apiService';

const getDates = () => {
  return apiService
    .request('get', '/tutor/timeInfoSchdule')
    .then((res) => {
      return res;
    });
};

const postSlot = (selectedSlots) => {
  return apiService
    .request('post', '/tutor/timeInfoSlot', { selectedSlots})
    .then((res) => {
      localStorage.setItem("time", res.data);
      console.log(res);
      return res;
    });
};

const getSelectedSlots = () => {
  return apiService
    .request('get', '/tutor/timeInfoSlot')
    .then((res) => {
      console.log(res);
      return res;
    });
};

const postDates = (values) => {
  return apiService
    .request('post', '/tutor/timeInfoSchdule', { values})
    .then((res) => {
      localStorage.setItem("time", res.data);
      console.log(res);
      return res;
    });
};

const onDelete = (_id) => {
  return apiService
    .request('delete', `/tutor/deleteTime/${_id}`)
    .then((res) => {
      return res;
    });
};



export { getDates, postDates, onDelete,postSlot,getSelectedSlots };
