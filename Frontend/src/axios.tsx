import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3100'
});
export default axiosInstance;

// Add a request interceptor to include the token
// instance.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('token'); // or however you store the token
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // If unauthorized, redirect to the login page
//             message.error('Session expired. Please log in again.');
//             window.location.href = '/login'; // Redirect to login page
//         }
//         return Promise.reject(error);
//     }
// );
