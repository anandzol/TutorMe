import axios from 'axios';

const API_URL = 'http://localhost:8082/api/university';

class UniversityService {
    /**
     * API Endpoint for getting all universities
     * @return {Object} Array containing all universities
     */
    getAllUniversities() {
        axios
            .get(`${API_URL}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    /**
     * API Endpoint for getting all universities, sorted by name alphabetically
     * @return {Object} Array containing all universities
     */
    getAllUniversitiesSorted() {
        axios
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
                return universitiesSorted;
            })
            .catch(error => {
                console.error(error);
            });
    }

    /**
     * API Endpoint for getting all faculties of a university
     * @param {String} universityId Id of the university for which all faculties should be returend
     * @return {Object} Array containing the faculties of a university
     */
    getUniversityFaculties(universityId) {
        axios
            .get(`${API_URL}/${universityId}`)
            .then(response => {
                return response.data.faculties;
            })
            .catch(error => {
                console.error(error);
            });
    }

    /**
     * API Endpoint for getting all faculties of a university, sorted by name alphabetically
     * @param {String} universityId Id of the university for which all faculties should be returend
     * @return {Object} Array containing the faculties of a unviersity
     */
    getUniversityFacultiesSorted(universityId) {
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

                return facultiesSorted;
            })
            .catch(error => {
                console.error(error);
            });
    }

    /**
     * API Endpoint for creating a new university
     * @param {Object} university
     */
    createUniversity(university) {
        axios
            .post(`${API_URL}`, university)
            .then(_ => {})
            .catch(error => {
                console.error(error);
            });
    }
}

export default new UniversityService();
