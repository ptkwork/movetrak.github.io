// JavaScript for Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle'); // Select the hamburger menu
    const navbar = document.getElementById('navbar'); // Select the navbar

    // Add event listener to menu toggle for click event
    menuToggle.addEventListener('click', function () {
        // Toggle 'open' class to display or hide the navbar
        navbar.classList.toggle('open');
        // Toggle 'active' class to change hamburger icon to a cross and back
        menuToggle.classList.toggle('active');
    });
});
