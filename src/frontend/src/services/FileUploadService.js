import axios from 'axios';

import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/fileUpload`;

/**
 * API Endpoint for getting all files uploaded
 * @return {Object} Array containing all files
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getAllFiles(callback, errorcallback) {
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
 * API Endpoint for getting all faculties of a university
 * @param {String} tutor sessionId created while he uploads the file
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function getFilesById(sessionId, callback, errorcallback) {
    axios
        .get(`${API_URL}/${sessionId}`)
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
 * API Endpoint for uploading a new file
 * @param {Object} payload
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function uploadFile(payload, callback, errorcallback) {
    const formData = new FormData();
    formData.append('file', payload);
    axios
        .post(`${API_URL}`, formData)
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
 * API Endpoint for deleting a file
 * @param {Object} payload
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function deleteFile(payload, callback, errorcallback) {
    axios
        .delete(`${API_URL}`, payload)
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
 * API Endpoint for downloading a file
 * @param {Object} payload
 * @param {Function} callback function executed if request is successful
 * @param {Function} errorcallback function executed if request is unsuccessful
 */
export function downloadFile(fileId, callback, errorcallback) {
    axios(`${API_URL}/download/${fileId}`,{
        method: 'GET',
        responseType: 'blob'
    })
        .then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], { type: 'application/pdf' });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);

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
