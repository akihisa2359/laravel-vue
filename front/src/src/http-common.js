import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        'Content-type': 'application/json',
    },
});

export default apiClient;