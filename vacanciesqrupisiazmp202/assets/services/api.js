// api.js

const API_URL = 'http://127.0.0.1:3001/vacancies';

// Vakansiyalar üçün məlumatları əldə etmək
export const getData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching vacancies:", error);
        throw error;
    }
};

// Vakansiyanı yeniləmək (edit)
export const editData = async (id, updatedVacancy) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedVacancy);
        return response.data;
    } catch (error) {
        console.error("Error editing vacancy:", error);
        throw error;
    }
};

// Vakansiyanı silmək (delete)
export const deleteData = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting vacancy:", error);
        throw error;
    }
};
