// script.js
// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Login button functionality
document.querySelector('.student-btn').addEventListener('click', () => {
    alert('Redirecting to Student Login...');
    // window.location.href = 'student-login.html';
});

document.querySelector('.teacher-btn').addEventListener('click', () => {
    alert('Redirecting to Teacher Login...');
    // window.location.href = 'teacher-login.html';
});

document.querySelector('.admin-btn').addEventListener('click', () => {
    alert('Redirecting to Administration Login...');
    // window.location.href = 'admin-login.html';
});