import HttpService from '../services/HttpService';

export default class UserService {
    static baseURL() {
        return 'http://localhost:8082/api/user';
    }

    static register(user) {
        HttpService.post(
            `${UserService.baseURL()}/register`,
            user,
            function (data) {
                console.log(data);
            },
            function (data) {
                console.log(data);
            }
        );
    }
}
