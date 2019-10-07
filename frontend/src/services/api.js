import axios from 'axios';
import consts from "../consts"

const api = axios.create({
    baseURL : consts.BASE_URL,

});

export default api;
