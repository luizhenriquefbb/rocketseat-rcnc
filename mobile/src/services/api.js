import axios from "axios";
import consts from "../consts"

export default axios.create({
    baseURL: consts.BASE_URL
});