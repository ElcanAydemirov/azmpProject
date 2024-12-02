document.getElementById('menu-button').addEventListener('click', function () {
    document.getElementById('sidebar').style.width = '250px';
});

document.getElementById('close-sidebar').addEventListener('click', function () {
    document.getElementById('sidebar').style.width = '0';
});