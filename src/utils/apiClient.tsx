import axios from "axios";

const baseUrl =`${process.env.REACT_APP_API_URL ?? ''}api/`;

const apiClient = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
        "Content-type": "application/json",
    }
});

export const handleSuccess = (response: any): any => response;

export const handleError = (error: any): any => Promise.reject(error);


apiClient.interceptors.response.use(handleSuccess, handleError);
apiClient.interceptors.request.use(config => config, handleError);

export default apiClient;
