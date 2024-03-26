import axios from 'axios'
const axiosInstance = axios.create({
    // baseURL: '', // 不在此处设置baseURL
    // 其他配置项
  });

  // 设置请求地址的函数，根据环境变量来判断
function setBaseUrl() {
    // if (process.env.NODE_ENV === 'production') {
      // 生产环境下的请求地址
      axiosInstance.defaults.baseURL = 'https://www.liuke.xyz';
    // } else {
    //   // 开发环境下的请求地址
    //   axiosInstance.defaults.baseURL = 'https://www.development-url.com';
    // }
  }
  
  // 在创建实例后调用设置请求地址的函数
  setBaseUrl();
  
  // 导出封装后的 Axios 实例
  export default axiosInstance;