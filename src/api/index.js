import axios from 'axios';
const request = axios.create({
    baseURL: 'http://api.cpengx.cn/metashop/api'
});

request.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data;
    } else {
        return response;
    }
}, error => {
    return Promise.reject(error);
});

export const getHomepage = params => {
    return request({
        method: 'GET',
        url: '/homepage',
        params
    });
};