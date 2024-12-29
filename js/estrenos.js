const gallery = document.getElementById('estrenos-container');

function loadMovies() {
    fetch('http://localhost:3001/estrenos') // Solicitud al backend
        .then(response => response.json())
        .then(estrenos => {
            renderMovies(estrenos);
        })
        .catch(error => {
            console.error('Error al cargar los estrenos:', error);
        });
}

function renderMovies(estrenos) {
    gallery.innerHTML = estrenos.map(estreno => `
        <div class="gallery-item" data-id="${estreno.id}">
            <img src="${estreno.photo}" alt="${estreno.title}">
            <div class="title">${estreno.title}</div>
        </div>
    `).join('');
}

loadMovies();
