import axios from 'axios';
import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/booking`;

/**
 * API Endpoint for getting all booked sessions (bookings) of a user by id
 * @param {String} userId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export async function getAllBookingsByUserId(userId, callback, errorcallback) {
    try {
        axios.get(`${API_URL}/student/${userId}`).then(
            response => {
                callback(response);
            },
            error => {
                errorcallback(error);
            }
        );
    } catch (error) {
        errorcallback(error);
    }
}

/**
 * API Endpoint for booking a session
 * @param {Object} payload
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function bookSession(payload, callback) {
    axios.post(`${API_URL}/book-session`, payload).then(response => {
        callback(response);
    });
    // .catch(error => {
    //     errorcallback(error);
    // });
}

/**
 * API Controller for rating a booking
 * @param {String} bookingId
 * @param {Object} payload
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function rateBooking(bookingId, payload, callback, errorcallback) {
    axios
        .post(`${API_URL}/rate/${bookingId}`, payload)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Controller for deleting a booking by id
 * @param {String} bookingId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function deleteBookingById(bookingId, callback, errorcallback) {
    axios
        .delete(`${API_URL}/${bookingId}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}
