import axios from 'axios'
import qs from 'qs'

//响应时间 //配置请求头
axios.defaults.timeout = 5000;

if (process.env.VUE_APP_MODE !== 'production') {
    axios.defaults.baseURL = 'api';   //配置接口地址
}
axios.defaults.withCredentials = true;

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if(config.method === 'post' && config.headers['Content-Type']  === 'application/x-www-form-urlencoded;charset=UTF-8'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    console.log('错误的传参')
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(!res.data.success){
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    console.log('网络异常' + error)
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//返回一个Promise(发送post请求, json格式)
export function fetchJsonPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}


////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function fetchFilePost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}})
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    fetchPost,
    fetchGet,
    fetchJsonPost,
    fetchFilePost
}

