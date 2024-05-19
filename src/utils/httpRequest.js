import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export const get = async (path, option={} ) => {
    const response = await httpRequest.get(path, option);
    return response.data;
}
export default httpRequest;