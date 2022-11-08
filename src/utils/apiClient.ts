import axios from 'axios';

import { sessionToken } from 'stores/reducers/tokenReducer';

const baseUrl = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Content-type': 'application/json',
  },
});

export const handleSuccess = (response: any): any => response;

export const handleError = (error: any): any => Promise.reject(error);

apiClient.interceptors.response.use(handleSuccess, handleError);
apiClient.interceptors.request.use((config) => config, handleError);

export default apiClient;

export const getRequest = async (url: string, parameters: any, isPagination: boolean = false) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const page: number = parameters?.page ?? 1;
  const additionalParamString = parameters.searcher !== null ? `&search=${parameters.searcher}` : '';
  const { data } = await apiClient.get(
    `${url}?page=${page}${additionalParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (isPagination) {
    return data;
  }
  return Object.prototype.hasOwnProperty.call(data, 'results') ? data.results : data;
};

export const getRequestFetchByParameters = async (url: string, parameters: any) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const customerParamString = parameters.customer !== null ? `customer=${parameters.customer}` : '';
  const { data } = await apiClient.get(
    `${url}?${customerParamString}`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const postRequest = async (url: string, payload: object) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.post(
    url,
    payload,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const putRequest = async (url: string, payload: object, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.put(
    `${url}${id}/`,
    payload,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const patchRequest = async (url: string, payload: object, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.patch(
    `${url}${id}/`,
    payload,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export const deleteRequest = async (url: string, id: number) => {
  const accessToken = JSON.parse(localStorage.getItem(sessionToken) as string).access;
  const { data } = await apiClient.delete(
    `${url}${id}/`,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
