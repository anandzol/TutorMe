import axios from 'axios';
import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/faculty`;

/**
 * API Endpoint for getting all available faculties
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getAllFaculties(callback, errorcallback) {
    axios
        .get(`${API_URL}`)
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
 * API Endpoint for getting all available faculties, sorted alphabetically by name
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsucecssful
 */
export function getAllFacultiesSorted(callback, errorcallback) {
    axios
        .get(`${API_URL}`)
        .then(response => {
            const faculties = response.data;
            let facultiesSorted = [];

            faculties
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach(item => {
                    facultiesSorted.push({
                        _id: item._id,
                        name: item.name
                    });
                });
            if (callback != null) {
                callback(facultiesSorted);
            }
        })
        .catch(error => {
            if (errorcallback != null) {
                errorcallback(error);
            }
        });
}

/**
 * API Endpoint for getting all courses of a faculty, sorted alphabetically by name
 * @param {String} facultyId Id of the faculty for which all courses should are fetched
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getFacultyCoursesSorted(facultyId, callback, errorcallback) {
    axios
        .get(`${API_URL}/courses/${facultyId}`)
        .then(courses => {
            let coursesSorted = [];
            courses.data
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach(item => {
                    coursesSorted.push({ _id: item._id, name: item.name });
                });

            if (callback != null) {
                callback(coursesSorted);
            }
        })
        .catch(error => {
            errorcallback(error);
        });
}

/**
 * API Endpoint for creating a new faculty
 * @param {Object} payload faculty which should be created
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function createFaculty(payload, callback, errorcallback) {
    axios
        .post(`${API_URL}`, payload)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}
