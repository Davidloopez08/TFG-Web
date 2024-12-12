
const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;

    if (name && email && category && message) {
        alert('Gracias por tu opinión. Nos pondremos en contacto contigo pronto.');
        feedbackForm.reset();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});