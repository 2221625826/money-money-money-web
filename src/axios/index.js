import axios from 'axios';

axios.defaults.baseURL = '/api' //此路径为配置代理服务器时的代理路径

axios.interceptors.request.use(config => {
    // 表示在配置中的设置头消息的字段Authorization为从本地获取的token值
    if (localStorage.getItem('token')) {
        document.cookie = "money-token=" + localStorage.getItem('token');
    }
    return config;
})

export default {
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data
            }).then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
};