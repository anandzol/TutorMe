import axios from 'axios';
import { SERVER_API } from '../config';

const API_URL = `${SERVER_API}/offering`;

export function getSlotsBySessionId(sessionId, callback, errorcallback) {
    axios
        .get(`${API_URL}/${sessionId}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorcallback(error);
        });
}