import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-607b6.firebaseio.com/'
});

export default instance;
