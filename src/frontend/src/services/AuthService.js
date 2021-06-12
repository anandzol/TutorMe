import axios from 'axios';
import { parseJwt } from './auth-header';
const API_URL = 'http://localhost:8082/api/user';

class AuthService {
    login(email, password) {
        return axios
            .post(`${API_URL}/login`, {
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.token));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(`${API_URL}/register`, user);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isLoggedIn() {
        return localStorage.getItem('user') !== null;
    }

    isAdmin() {
        if (this.isLoggedIn()) {
            const currentUserToken = this.getCurrentUser();
            const currentUser = parseJwt(currentUserToken);
            return currentUser.role === 'admin';
        }
        return false;
    }

    isTutor() {
        if (this.isLoggedIn()) {
            const currentUserToken = this.getCurrentUser();
            const currentUser = parseJwt(currentUserToken);
            return currentUser.role === 'tutor' || currentUser.role === 'admin';
        }
        return false;
    }
}

export default new AuthService();
