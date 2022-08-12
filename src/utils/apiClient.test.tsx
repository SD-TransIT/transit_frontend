import apiClient from './apiClient';

describe('apiClient', () => {
    test('should return 200', () => {
        return apiClient.get('http://httpstat.us/200')
            .then(response => expect(response.status).toEqual(200));
    });

    test('should return 201', () => {
        return apiClient.get('http://httpstat.us/201')
            .then(response => expect(response.status).toEqual(201));
    });

    test('should return 404', () => {
        return apiClient.get('http://httpstat.us/404')
            .catch(error => expect(error.response.status).toEqual(404));
    });

    test('should return 404 because of wrong resource', () => {
        return apiClient.get('http://httpstat.us/205xxxx')
            .catch(error => expect(error.response.status).toEqual(404));
    });

    test('should return 401', () => {
        return apiClient.get('http://httpstat.us/401')
            .catch(error => expect(error.response.status).toEqual(401));
    });

    test('should return 403', () => {
        return apiClient.get('http://httpstat.us/403')
            .catch(error => expect(error.response.status).toEqual(403));
    });

    test('should return 500', () => {
        return apiClient.get('http://httpstat.us/500')
            .catch(error => expect(error.response.status).toEqual(500));
    });
});
