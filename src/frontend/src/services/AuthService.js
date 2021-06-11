import axios from 'axios';

const API_URL = 'http://localhost:8082/api/user';

class AuthService {
    login(email, password) {
        return axios
            .post(`${API_URL}/login`, {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(`${API_URL}/register`, {
            user
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
