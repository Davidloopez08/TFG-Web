const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;

    if (name && email && category && message) {
        try {
            const response = await fetch('http://localhost:3001/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, category, message })
            });

            if (response.ok) {
                alert('Gracias por tu opinión. Se ha enviado con éxito.');
                feedbackForm.reset();
            } else {
                alert('Error al enviar la aportación. Por favor, inténtalo nuevamente.');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error al enviar la aportación. Por favor, inténtalo nuevamente.');
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
