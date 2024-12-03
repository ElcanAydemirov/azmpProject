import { getDataFromLocalStorage, setDataToLocalStorage } from '../services/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const toggleBtn = document.getElementById('toggle-btn');
    const signinSection = document.getElementById('signin-section');
    const signupSection = document.getElementById('signup-section');

    function toggleForms() {
        signinSection.classList.toggle('active');
        signupSection.classList.toggle('active');

        if (toggleBtn.textContent.includes('Signup')) {
            toggleBtn.textContent = 'Already have an account? Signin';
        } else {
            toggleBtn.textContent = 'No Account Yet? Signup';
        }
    }

    toggleBtn.addEventListener('click', toggleForms);

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = {
            fullname: document.getElementById('signup-fullname').value,
            email: document.getElementById('signup-email').value,
            password: document.getElementById('signup-password').value,
            experience: document.getElementById('signup-experience').value,
            linkedin: document.getElementById('signup-linkedin').value,
            skills: document.getElementById('signup-skills').value.split(',')
        };

        let users = getDataFromLocalStorage('users') || [];
        users.push(user);
        setDataToLocalStorage('users', users);

        alert('Account Created!');
        toggleForms();
    });

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const signinAndEmail = document.getElementById('signin-username-email').value;
        const password = document.getElementById('signin-password').value;
        const users = getDataFromLocalStorage('users') || [];
        const user = users.find(u => (u.email === signinAndEmail || u.fullname === signinAndEmail) && u.password === password);


        if (user) {
            alert('Welcome back!');
            window.location.href = "../"
        } else {
            alert('sehv');
        }
    });
});
