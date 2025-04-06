import axios from 'axios';

const ax = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export default ax;
