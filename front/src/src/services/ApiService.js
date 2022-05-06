import http from '@/http-common';

class ApiService {
    get(id) {
        return http.get(`/api/user/${id}`);
    }
    register(data) {
        return http.post('/api/register', data);
    }
}

export default new ApiService();