import axios from "axios";

const req = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_URL}`
});

export default req;
