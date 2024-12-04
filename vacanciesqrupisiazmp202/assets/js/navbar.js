const menuIcon = document.getElementById('menu-icon');
const navList = document.querySelector('.nav ul');

// Toggle the menu visibility when hamburger is clicked
menuIcon.addEventListener('click', () => {
    navList.classList.toggle('show');
});