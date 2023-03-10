import axios from 'axios';

import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/university`;

/**
 * API Endpoint for getting all universities
 * @return {Object} Array containing all universities
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getAllUniversities(callback, errorcallback) {
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
 * API Endpoint for getting all universities, sorted by name alphabetically
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getAllUniversitiesSorted(callback, errorcallback) {
    axios
        .get(`${API_URL}`)
        .then(response => {
            const data = response.data;

            let universitiesSorted = [];
            data.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                let coursesSorted = [];

                item.courses
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .forEach(item => {
                        coursesSorted.push(item);
                    });

                universitiesSorted.push({
                    _id: item._id,
                    name: item.name,
                    faculties: item.faculties,
                    courses: coursesSorted
                });
            });

            if (callback != null) {
                callback(universitiesSorted);
            }
        })
        .catch(error => {
            if (errorcallback != null) {
                errorcallback(error);
            }
        });
}

/**
 * API Endpoint for getting all faculties of a university
 * @param {String} universityId Id of the university for which all faculties should be returend
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getUniversityById(universityId, callback, errorcallback) {
    axios
        .get(`${API_URL}/${universityId}`)
        .then(response => {
            // Sort courses of faculties by name alphabetically
            response.data.faculties.forEach(item => {
                item.courses.sort((a, b) => a.name.localeCompare(b.name));
            });

            // Sort order of faculties by name alphabetically
            response.data.faculties.sort((a, b) => a.name.localeCompare(b.name));
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
 * API Endpoint for getting all faculties of a university, sorted by name alphabetically
 * @param {String} universityId Id of the university for which all faculties should be returend
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getUniversityFacultiesSorted(universityId, callback, errorcallback) {
    axios
        .get(`${API_URL}/${universityId}`)
        .then(response => {
            const faculties = response.data.faculties;
            let facultiesSorted = [];
            faculties
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach(item => {
                    let coursesSorted = [];
                    item.courses
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .forEach(item => {
                            coursesSorted.push(item);
                        });

                    facultiesSorted.push({
                        _id: item._id,
                        name: item.name,
                        courses: coursesSorted
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
 * API Endpoint for creating a new university
 * @param {Object} payload
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function createUniversity(payload, callback, errorcallback) {
    axios
        .post(`${API_URL}`, payload)
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
