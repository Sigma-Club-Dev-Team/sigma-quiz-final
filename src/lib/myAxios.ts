import axios from 'axios';
import { SERVER_URL } from './constants';

const myAxios = axios.create({
  baseURL: SERVER_URL, // Replace with your API base URL
});


// Request interceptor
myAxios.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    // Handle request errors here
    console.error(error)
    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
myAxios.interceptors.response.use(
  (response) => {
    // Modify the response data here
    if(response.data?.status == 'error'){
      return Promise.reject(response.data)
    }


    return response;
  },
  async (error) => {
    // Handle response errors here
    if (error.response?.status === 401) {
      error.response.logUserOut = true
    }

    return Promise.reject(error);
  }
);
// End of Response interceptor

export default myAxios;