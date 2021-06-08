import axios from 'axios';

export default class HttpService {
    static async get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        let resp = await axios.get(url, {
            headers: header
        });

        if (resp.error) {
            onError(resp.error);
        } else {
            if (resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
                resp.user = this.extractUser(resp.token);
            }
            onSuccess(resp);
        }
    }

    static async put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        let resp = await axios.put(url, data, {
            headers: header
        });

        if (resp.error) {
            onError(resp.error);
        } else {
            if (resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
                resp.user = this.extractUser(resp.token);
            }
            onSuccess(resp);
        }
    }

    static async post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        let resp = await axios.post(url, data, {
            headers: header
        });

        if (resp.error) {
            onError(resp.error);
        } else {
            if (resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
                resp.user = this.extractUser(resp.token);
            }
            onSuccess(resp);
        }
    }

    static async remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        let resp = await axios.delete(url, {
            headers: header
        });

        if (resp.error) {
            onError(resp.error);
        } else {
            if (resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
                resp.user = this.extractUser(resp.token);
            }
            onSuccess(resp);
        }
    }

    static checkIfUnauthorized(res) {
        if (res.status === 401) {
            return true;
        }
        return false;
    }
}
