import axios from 'axios';
import { response } from 'express';
import HttpService from './HttpService';
const API_URL = 'http://localhost:8082/api/university';

/**
 * API Endpoint for getting all universities
 * @return {Object} Array containing all universities
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
 * @return {Object} Array containing all universities
 */
export function getAllUniversitiesSorted(callback, errorcallback) {
    return axios
        .get(`${API_URL}`)
        .then(response => {
            const data = response.data;
            let universitiesSorted = [];
            data.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                universitiesSorted.push({
                    _id: item._id,
                    name: item.name
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
 * @return {Object} Array containing the faculties of a university
 */
export function getUniversityFaculties(universityId, callback, errorcallback) {
    axios
        .get(`${API_URL}/${universityId}`)
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
 * API Endpoint for getting all faculties of a university, sorted by name alphabetically
 * @param {String} universityId Id of the university for which all faculties should be returend
 * @return {Object} Array containing the faculties of a unviersity
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
 * API Endpoint for creating a new university
 * @param {Object} university
 */
export function createUniversity(university, callback, errorcallback) {
    axios
        .post(`${API_URL}`, university)
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
