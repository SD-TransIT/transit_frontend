import { AxiosError } from 'axios';
import apiClient from './apiClient';
import { NoErrorThrownError, getError } from './getError';


describe('apiClient', () => {
  test('should return 200', async () => {
    return apiClient.get('http://httpstat.us/200')
      .then(response => expect(response.status).toEqual(200));
  });

  test('should return 201', async () => {
    return apiClient.get('http://httpstat.us/201')
      .then(response => expect(response.status).toEqual(201));
  });

  test('should return 404',  async () => {
    const error = await getError(async () => apiClient.get('http://httpstat.us/404'));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(AxiosError);
    const axiosError = error as AxiosError;
    expect(axiosError.response?.status).toEqual(404);
  });

  test('should return 404 because of wrong resource', async () => {
    const error = await getError(async () => apiClient.get('http://httpstat.us/205xxxx'));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(AxiosError);
    const axiosError = error as AxiosError;
    expect(axiosError.response?.status).toEqual(404);
  });

  test('should return 401', async () => {
    const error = await getError(async () => apiClient.get('http://httpstat.us/401'));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(AxiosError);
    const axiosError = error as AxiosError;
    expect(axiosError.response?.status).toEqual(401);
  });

  test('should return 403', async () => {
    const error = await getError(async () => apiClient.get('http://httpstat.us/403'));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(AxiosError);
    const axiosError = error as AxiosError;
    expect(axiosError.response?.status).toEqual(403);
  });

  test('should return 500', async () => {
    const error = await getError(async () => apiClient.get('http://httpstat.us/500'));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(AxiosError);
    const axiosError = error as AxiosError;
    expect(axiosError.response?.status).toEqual(500);
  });
});
