import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Outgoing Request:", config.url);

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                console.warn("Unauthorized! Token may be expired");
            }

            if (status === 500) {
                console.error("Server Error");
            }
        }

        return Promise.reject(error)
    }
);

export default axiosInstance;