import axios from 'axios';
import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/booking`;

/**
 * API Endpoint for getting all booked sessions (bookings) of a user by id
 * @param {String} userId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function getAllBookingsByUserId(userId, callback, errorcallback) {
    axios.get(`${API_URL}/student/${userId}`).then(
        response => {
            callback(response);
        },
        error => {
            errorcallback(error);
        }
    );
}

/**
 * API Endpoint for booking a session
 * @param {Object} payload
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function bookSession(payload, callback, errorcallback) {
    axios
        .post(`${API_URL}/book-session`, payload)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}
