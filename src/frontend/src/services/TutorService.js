import axios from 'axios';

import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/user`;

/**
 * API Endpoint for getting all necessary tutor information of a tutor
 * @param {String} tutorId Id of the tutor for which the information should be fetched
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getTutorById(tutorId, callback, errorcallback) {
    axios
        .get(`${API_URL}/${tutorId}`)
        .then(response => {
            if (callback != null) {
                callback(response);
            }
        })
        .catch(error => {
            if (errorcallback != null) {
                errorcallback(error);
            }
        });
}

/**
 * API Endpoint for getting all booked offerings of a tutor
 * @param {String} tutorId
 * @param {Function} callback
 * @param {Function} errorcallback
 */
export function getBookedOfferingsByUserId(tutorId, callback, errorcallback) {
    axios
        .get(`${API_URL}/booked-offerings/${tutorId}`)
        .then(response => {
            if (callback != null) {
                callback(response);
            }
        })
        .catch(error => {
            if (errorcallback != null) {
                errorcallback(error);
            }
        });
}
