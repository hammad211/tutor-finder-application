import apiService from '../apiService';

const postImage = (selectedFile) => {
  return apiService
    .request('post', 'picture/imgInfo', { selectedFile })
    .then((res) => {
      localStorage.setItem("image", res.data);
      return res;
    });
};

const getImages = () => {
  return apiService
    .request('get', '/picture/imgInfo')
    .then((res) => {
      return res;
    });
};

const updateImage = (selectedFile) => {
  return apiService
    .request('put', '/picture/imgInfo', { selectedFile })
    .then((res) => {
      return res;
    });
};

export { postImage, getImages, updateImage };
