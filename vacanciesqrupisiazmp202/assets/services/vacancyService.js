let vacancies = [];

function parseSalaryRange(range) {
    const [min, max] = range.split("-").map(Number);
    return { min, max };
}

function filterVacancies() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const salaryRange = document.getElementById("salary-range").value;
    const sorting = document.getElementById("sorting").value;
    const employmentType = document.getElementById("employment-type").value;

    let filteredVacancies = vacancies.filter((vacancy) => {
        const matchesSearch = !searchInput || vacancy.title.toLowerCase().includes(searchInput);
        const matchesEmployment = !employmentType || vacancy.employmentType === employmentType;

        const matchesSalary = !salaryRange || (() => {
            const { min, max } = parseSalaryRange(salaryRange);
            const [vacMin, vacMax] = vacancy.salary
                .replace(" AZN", "")
                .split("-")
                .map(Number);
            return vacMax >= min && vacMin <= max;
        })();

        return matchesSearch && matchesEmployment && matchesSalary;
    });

    if (sorting === "salary") {
        filteredVacancies.sort((a, b) => {
            const aSalary = parseInt(a.salary.split("-")[0]);
            const bSalary = parseInt(b.salary.split("-")[0]);
            return aSalary - bSalary;
        });
    } else if (sorting === "title") {
        filteredVacancies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sorting === "company") {
        filteredVacancies.sort((a, b) => a.company.localeCompare(b.company));
    }

    renderVacancies(filteredVacancies);
}

function renderVacancies(vacancies) {
    const list = document.getElementById("vacancy-list");
    list.innerHTML = ""; 

    vacancies.forEach((vacancy) => {
        const div = document.createElement("div");
        div.classList.add("vacancy-item");
        div.innerHTML = `
            <h3 class="vacancy-title">${vacancy.title}</h3>
            <p><strong>Maaş:</strong> ${vacancy.salary}</p>
            <p><strong>Şirkət:</strong> ${vacancy.company}</p>
            <p><strong>İş növü:</strong> ${vacancy.employmentType}</p>
        `;
        list.appendChild(div);

        div.querySelector(".vacancy-title").addEventListener("click", () => {
            openModal(vacancy); 
        });
    });
}

function openModal(vacancy) {
    document.getElementById("modal-title").textContent = vacancy.title;
    document.getElementById("modal-company").textContent = vacancy.company;
    document.getElementById("modal-salary").textContent = vacancy.salary;
    document.getElementById("modal-employment-type").textContent = vacancy.employmentType;
    document.getElementById("modal-postedAt").textContent = new Date(vacancy.postedAt).toLocaleString();
    document.getElementById("modal-expiresAt").textContent = new Date(vacancy.expiresAt).toLocaleString();
    document.getElementById("modal-description").textContent = vacancy.description;

    document.getElementById("vacancy-modal").style.display = "flex";
}


document.getElementById("vacancy-modal").addEventListener("click", (event) => {
    if (event.target === document.getElementById("vacancy-modal")) {
        document.getElementById("vacancy-modal").style.display = "none";
    }
});

async function fetchVacancies() {
    try {
        const response = await fetch("http://localhost:3000/vacancies"); 
        if (!response.ok) throw new Error("API-dən məlumat yüklənmədi");

        const data = await response.json(); 
        vacancies = data; 

        renderVacancies(vacancies); 
    } catch (error) {
        console.error("Vakansiyaları yükləmək mümkün olmadı:", error);
    }
}

document.getElementById("search-input").addEventListener("input", filterVacancies);
document.getElementById("salary-range").addEventListener("change", filterVacancies);
document.getElementById("sorting").addEventListener("change", filterVacancies);
document.getElementById("employment-type").addEventListener("change", filterVacancies);

fetchVacancies();
