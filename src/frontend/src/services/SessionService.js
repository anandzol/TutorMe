import axios from 'axios';
import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/session`;

/**
 * API Endpoint for creating a new tutorial session
 * @param {Object} payload session which should be created
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccesful
 */
export function createSession(payload, callback, errorcallback) {
    axios
        .post(`${API_URL}, payload`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(response);
        });
}
