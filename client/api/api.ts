import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: true,
    headers: {
        "API-KEY": "8ae06c9d-040e-448f-b487-fe6bad0de921"
    }
})