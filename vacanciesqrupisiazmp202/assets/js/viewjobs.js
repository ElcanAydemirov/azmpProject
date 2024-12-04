let vacancies = [];
let filteredVacancies = [];

// Vakansiyaları çəkmək
async function fetchVacancies() {
    try {
        const response = await axios.get("http://localhost:3000/vacancies");
        vacancies = response.data;
        filteredVacancies = vacancies;
        renderVacancies(filteredVacancies);
    } catch (error) {
        Swal.fire("Xəta!", "Vakansiyaları çəkmək mümkün olmadı.", "error");
    }
}

// Vakansiyaları göstərmək
function renderVacancies(vacancies) {
    const container = document.getElementById("vacancies");
    container.innerHTML = "";

    if (vacancies.length === 0) {
        container.innerHTML = "<p class='text-center'>Heç bir vakansiya tapılmadı.</p>";
        return;
    }

    vacancies.forEach((vacancy) => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${vacancy.title}</h5>
                    <p class="card-text">${vacancy.description}</p>
                    <p><strong>Maaş:</strong> ${vacancy.salary}</p>
                    <p><strong>İş növü:</strong> ${vacancy.employmentType}</p>
                    <p><strong>Tarix:</strong> ${new Date(vacancy.postedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Axtarış funksiyası
document.getElementById("searchQuery").addEventListener("input", () => filterVacancies());

// Süzgəclər
document.getElementById("employmentType").addEventListener("change", () => filterVacancies());
document.getElementById("salaryRange").addEventListener("input", (event) => {
    document.getElementById("salaryDisplay").innerText = `Maksimum: ${event.target.value} AZN`;
    filterVacancies();
});

// Vakansiyaları süzmək
function filterVacancies() {
    const query = document.getElementById("searchQuery").value.toLowerCase();
    const employmentType = document.getElementById("employmentType").value;
    const maxSalary = parseInt(document.getElementById("salaryRange").value);

    filteredVacancies = vacancies.filter((vacancy) => {
        const [minSalary, maxVacancySalary] = vacancy.salary
            .replace("AZN", "")
            .split("-")
            .map(Number);

        const matchesQuery = vacancy.title.toLowerCase().includes(query) || vacancy.description.toLowerCase().includes(query);
        const matchesType = employmentType ? vacancy.employmentType === employmentType : true;
        const matchesSalary = maxVacancySalary <= maxSalary;

        return matchesQuery && matchesType && matchesSalary;
    });

    renderVacancies(filteredVacancies);
}

// Sıralama funksiyası
function sortVacancies(criteria) {
    filteredVacancies.sort((a, b) => {
        if (criteria === "salary") {
            const aSalary = parseInt(a.salary.split("-")[0]);
            const bSalary = parseInt(b.salary.split("-")[0]);
            return aSalary - bSalary;
        }
        if (criteria === "date") {
            return new Date(a.postedAt) - new Date(b.postedAt);
        }
        if (criteria === "company") {
            return a.companyId.localeCompare(b.companyId);
        }
        return 0;
    });

    renderVacancies(filteredVacancies);
}

// Səhifə yüklənərkən vakansiyaları çəkmək
fetchVacancies();