import axios from 'axios';
import { SERVER_API } from '../config';
const API_URL = `${SERVER_API}/course`;

/**
 * API Endpoint for creating a new create
 * @param {Object} payload course which should be created
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function createCourse(payload, callback, errorcallback) {
    axios
        .post(`${API_URL}`, payload)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}
