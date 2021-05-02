import axios from 'axios';


const time = (fecha) => {
    const currentDate = new Date()
    var diff = currentDate.getTime() - fecha.getTime()
    return diff / 1000
}

const api = async(baseURL, url, data = {}, method) => {
    const date = new Date()
    const headers = { "Content-Type": "application/json" };


    return axios({
        baseURL,
        url,
        method,
        headers,
        data,
    }).then(response => {
        console.log(time(date));
        return Promise.resolve(response.data)
    }, err => {
        console.log(time(date));
        console.log(err);
        return Promise.reject(err)
    })
}

export default api;