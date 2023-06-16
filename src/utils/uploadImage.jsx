import axios from "axios";

const uploadImage = (images) => {
  const formData = new FormData();
  formData.append("image", images[0]);

  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${
    import.meta.env.VITE_IMAGE_KEY
  }`;

  return axios.post(url, formData);
};

export default uploadImage;
