import axios from 'axios';
import { SERVER_API } from '../config';
import { getBookedOfferingsByUserId } from '../services/TutorService';
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
