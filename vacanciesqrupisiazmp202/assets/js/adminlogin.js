// Login formunu yoxlamaq və istifadəçi tipini müəyyən etmək
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Admin və ya Kompaniya seçimi ilə uyğun hərəkət etmək
    if (userType === 'company') {
        // Kompaniya formunu göstərmək
        document.getElementById('companyFormContainer').style.display = 'block';
        document.getElementById('loginContainer').style.display = 'none';
    } else {
        // Admin girişini yoxlamaq
        axios.post('http://localhost:3000/users', { email: username, password: password })
            .then(function (response) {
                if (response.data && response.data.isAdmin) {
                    // Admin istifadəçi girişində müvafiq mesaj göstərilir
                    Swal.fire('Giriş uğurludur!', 'Admin panelinə yönlendirildiniz.', 'success');
                } else {
                    // Əgər admin deyilsə, sadə istifadəçi ilə əlaqə
                    Swal.fire('Giriş uğursuz!', 'Sadə istifadəçi girişi qəbul edildi.', 'error');
                }
            })
            .catch(function (error) {
                // Hər hansı bir xəta baş verərsə, xəbərdarlıq göstərmək
                Swal.fire('Xəta baş verdi!', 'Giriş zamanı xəta ilə qarşılaşıldı.', 'error');
                console.error(error);
            });
    }
});

// Kompaniya formunu yoxlamaq və daxil edilmiş məlumatları göstərmək
document.getElementById('companyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const companyName = document.getElementById('companyName').value;
    const companyLocation = document.getElementById('companyLocation').value;
    const companyIndustry = document.getElementById('companyIndustry').value;

    // İstifadəçinin daxil etdiyi məlumatları yoxlamaq
    if (companyName && companyLocation && companyIndustry) {
        // Bütün inputlar doğru doldurulubsa, məlumatları göstəririk
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `
            <h3>Şirkət Məlumatları:</h3>
            <p><strong>Şirkət Adı:</strong> ${companyName}</p>
            <p><strong>Yerleşim:</strong> ${companyLocation}</p>
            <p><strong>Sənaye:</strong> ${companyIndustry}</p>
        `;

        document.body.appendChild(resultDiv);

        // Əlavə olaraq, müvəffəqiyyətli mesaj göstəririk
        Swal.fire('Kompaniya məlumatları doğrulandı!', '', 'success');
        document.getElementById('companyForm').reset();
    } else {
        // Əgər məlumatlardan biri boşdursa, xəbərdarlıq göstəririk
        Swal.fire('Bütün məlumatları doldurun!', 'Şirkət adı, yerleşim və sənaye daxil edilməlidir.', 'error');
    }
});

// Şifrəni unutmuşam linkinə klik edildikdə login səhifəsinə qayıtmaq
document.getElementById('forgotPasswordLink').addEventListener('click', function (e) {
    e.preventDefault();
    // Şifrəni unutmuşam formunu gizlət və login formuna qayıt
    document.getElementById('forgotPasswordContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

// Back to login linkinə klik edildikdə login səhifəsinə qayıtmaq
document.getElementById('backToLoginLink').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('companyFormContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});
