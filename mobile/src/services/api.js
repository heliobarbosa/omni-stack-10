import axios from 'axios'

const api = axios.create({
    baseURL:"http://ez-xyg.anonymous.mobile.exp.direct:3333",
})

export default api;