import axios from 'axios';

const ax = axios.create({
  baseURL: 'https://go-todo-api-isvv.onrender.com',
});

export default ax;
