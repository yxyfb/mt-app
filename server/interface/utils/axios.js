import axios from 'axios';

const instance = axios.create({ //process.env是用户环境的对象
  baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout: 5000,
  headers: {

  }
});

export default instance;
