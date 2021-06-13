import axios from 'axios';

const API_URL = 'http://localhost:8082/api/faculty';

class FacultyService {
    getAllFaculties() {
        axios.get(`${API_URL}`).then(response => {
            return response.data;
        });
    }
}

export default new FacultyService();
