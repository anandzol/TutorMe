import axios from 'axios';
import { parseJwt } from './AuthHeader';
import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/user`;

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

    register(user, callback, errorcallback) {
        return axios
            .post(`${API_URL}/register`, user)
            .then(response => {
                if (callback != null) {
                    callback(response);
                }
            })
            .catch(error => {
                console.error(error);
                errorcallback(error);
            });
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
