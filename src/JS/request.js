import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/';
const key = 'yU7TwYjwTWYWDTP_e9ldnsOpcQrW6hUoVyNES_8SU2U';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getImages = async params => {
  const response = await api.get(`search/photos/?client_id=${key}`, {
    params,
  });
  return response.data;
};
