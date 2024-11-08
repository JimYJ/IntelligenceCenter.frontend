import axios from 'axios'

// 初始化请求地址
const http = axios.create({
    baseURL: 'http://127.0.0.1:6061/api',
})
// 封装 GET 请求
export const get = (url, params) => {
    return http.get(url, { params });
};

// 封装 POST 请求
export const post = (url, data, params) => {
    return http.post(url, data, { params });
};

// // 添加请求拦截器
// http.interceptors.request.use(
//     config => {
//         // 在请求发送之前做些什么，例如添加 token
//         return config;
//     },
//     error => {ws
//         return Promise.reject(error);
//     }
// );

// 添加响应拦截器
http.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        // console.log("响应报文:", response)
        return response.data; // 返回实际数据
    },
    error => {
        // 处理错误
        return Promise.reject(error);
    }
);