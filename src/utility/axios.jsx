// axios.js

import axios from "axios";

const instance = axios.create({
  //  baseURL: "http://localhost:4500", 
    // baseURL: "https://evangadifinal.onrender.com/", 
// Adjust this to your server's URL
baseURL:"https://evangadilast-backend.onrender.com",
  withCredentials: true,
});

// Interceptors for handling response and error
instance.interceptors.response.use(
  (response) => {
    // Return response data directly if successful
    return response.data;
  },
  (error) => {
    // Return error message if available
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
);

export default instance;
