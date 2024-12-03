const API_URL = 'http://127.0.0.1:3000/vacancies';

async function getVacancies() {
    try {
        const response = await axios.get(API_URL);
        const vacancies = response.data;
        renderVacancyList(vacancies);
    } catch (error) {
        console.error("Error fetching vacancies:", error);
    }
}

function renderVacancyList(vacancies) {
    const vacancyListContainer = document.getElementById('vacancy-list');
    vacancyListContainer.innerHTML = '';
    vacancies.forEach(vacancy => {
        const vacancyCard = document.createElement('div');
        vacancyCard.classList.add('vacancy-card', 'card');
        vacancyCard.innerHTML = `
            <h5 class="card-title">${vacancy.title}</h5>
            <p class="card-text"><strong>Description:</strong> ${vacancy.description}</p>
            <p class="card-text"><strong>Salary:</strong> ${vacancy.salary}</p>
            <p class="card-text"><strong>Posted At:</strong> ${new Date(vacancy.postedAt).toLocaleString()}</p>
            <p class="card-text"><strong>Expires At:</strong> ${new Date(vacancy.expiresAt).toLocaleString()}</p>
            <p class="card-text"><strong>Employment Type:</strong> ${vacancy.employmentType}</p>
            <div class="candidate-status">
                <strong>Candidates:</strong>
                ${vacancy.candidates.map(candidate => `<span>${candidate.status}</span>`).join(', ')}
            </div>
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-warning btn-sm" onclick="editVacancy(${vacancy.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteVacancy(${vacancy.id})">Delete</button>
            </div>
        `;
        vacancyListContainer.appendChild(vacancyCard);
    });
}

async function editVacancy(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        const vacancy = response.data;
        document.getElementById('jobTitle').value = vacancy.title;
        document.getElementById('description').value = vacancy.description;
        document.getElementById('salary').value = vacancy.salary;
        document.getElementById('postedAt').value = vacancy.postedAt.substring(0, 16);
        document.getElementById('expiresAt').value = vacancy.expiresAt.substring(0, 16);
        document.getElementById('employmentType').value = vacancy.employmentType;
    } catch (error) {
        console.error("Error fetching vacancy details:", error);
    }
}
//delete
async function deleteVacancy(id) {
    try {
        await axios.delete(`${API_URL}/${id}`);
        getVacancies();
    } catch (error) {
        console.error("Error deleting vacancy:", error);
    }
}

document.getElementById('vacancy-form-id').addEventListener('submit', async function (event) {
    event.preventDefault();
    const jobTitle = document.getElementById('jobTitle').value;
    const description = document.getElementById('description').value;
    const salary = document.getElementById('salary').value;
    const postedAt = document.getElementById('postedAt').value;
    const expiresAt = document.getElementById('expiresAt').value;
    const employmentType = document.getElementById('employmentType').value;

    const newVacancy = {
        title: jobTitle,
        description: description,
        salary: salary,
        postedAt: postedAt,
        expiresAt: expiresAt,
        employmentType: employmentType,
        candidates: []
    };

    try {
        await axios.post(API_URL, newVacancy);
        getVacancies();
        document.getElementById('vacancy-form-id').reset();
    } catch (error) {
        console.error("Error adding vacancy:", error);
    }
});

getVacancies();