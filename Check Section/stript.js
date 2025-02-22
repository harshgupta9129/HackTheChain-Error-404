document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation (existing code - keep this)
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission (page reload)

        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMessage.textContent = ''; // Clear previous success message

        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        // Validate Email
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            isValid = false;
        }

        if (isValid) {
            // Simulate successful submission (replace with actual submission logic later)
            successMessage.textContent = 'Message sent successfully!';
            form.reset(); // Clear the form
        }
    });

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Particle Background Code (NEW)
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Adjust particles on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.directionY = -this.directionY;
            }

            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;  // Adjust this for density
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = Math.random() * (canvas.width - (size * 2));
            let y = Math.random() * (canvas.height - (size * 2));
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(255,255,255,0.5)'; // Semi-transparent white

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    init();
    animate();
});