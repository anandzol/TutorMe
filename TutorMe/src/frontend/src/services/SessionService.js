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
        .post(API_URL, payload)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Endpoint for getting all available sessions
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getAllSessions(callback, errorcallback) {
    axios
        .get(API_URL)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Endpoint for getting all sessions of a university
 * @param {String} payload id of the university
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getAllSessionsByUniversity(universityId, callback, errorcallback) {
    axios
        .get(`${API_URL}/university/${universityId}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Endpoint for getting all verified sessions of a university
 * @param {String} universityId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export async function getAllVerifiedSessionsByUniversity(universityId, callback, errorcallback) {
    try {
        axios
            .get(`${API_URL}/verified/university/${universityId}`)
            .then(response => {
                callback(response);
            })
            .catch(error => {
                errorcallback(error);
            });
    } catch (error) {
        errorcallback(error);
    }
}

/**
 * API Endpoint for getting a specific session by id
 * @param {String} sessionId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function getSessionById(sessionId, callback, errorcallback) {
    axios
        .get(`${API_URL}/${sessionId}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Endpoint for getting all pending sessions for approval
 * @param {String} document
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function getAllPendingSessionsForApproval(callback, errorcallback) {
    axios
        .get(`${API_URL}/pending/document`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Endpoint for approving/rejecting pending sessions
 * @param {String} docId @param {String} status
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function updateSessionStatus(docId, status, callback, errorcallback) {
    axios
        .put(`${API_URL}/document/${docId}/${status}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Endpoint for getting all booked offerings (bookedOfferings) of a user by id
 * @param {String} userId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export async function getAllSessionsByTutorId(userId, callback, errorcallback) {
    try {
        axios.get(`${API_URL}/tutor/${userId}`).then(
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
 * Delete a session by its id
 * @param {String} sessionId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function deleteSessionById(sessionId, callback, errorcallback) {
    axios.delete(`${API_URL}/${sessionId}`).then(
        response => {
            callback(response);
        },
        error => {
            errorcallback(error);
        }
    );
}
