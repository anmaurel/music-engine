import axios from "axios";

const req = axios.create({
    baseURL: `${process.env.BACK_URL}`
});

export default req;
