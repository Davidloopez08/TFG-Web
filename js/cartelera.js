const gallery = document.getElementById('gallery');
const popup = document.createElement('div');
popup.classList.add('popup');
document.body.appendChild(popup);

function loadMovies() {
    fetch('http://localhost:3001/peliculas') // Solicitud al backend
        .then(response => response.json())
        .then(peliculas => {
            renderMovies(peliculas);
            attachPopupListeners(peliculas);
        })
        .catch(error => {
            console.error('Error al cargar las películas:', error);
        });
}

function renderMovies(peliculas) {
    gallery.innerHTML = peliculas.map(pelicula => `
        <div class="gallery-item" data-id="${pelicula.id}">
            <img src="${pelicula.photo}" alt="${pelicula.title}">
            <div class="title">${pelicula.title}</div>
        </div>
    `).join('');
}

function attachPopupListeners(peliculas) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const peliculaId = item.dataset.id;
            const pelicula = peliculas.find(p => p.id === parseInt(peliculaId));

            if (pelicula) {
                showPopup(pelicula);
            }
        });
    });
}

function showPopup(pelicula) {
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>${pelicula.title}</h2>
            <p><strong>Año:</strong> ${pelicula.year}</p>
            <p><strong>Descripción:</strong> ${pelicula.description}</p>
            <p><strong>Categoría:</strong> ${pelicula.category}</p>
            <video src="${pelicula.url}" controls></video>
        </div>
    `;
    popup.style.display = 'flex';

    const closeBtn = popup.querySelector('.close-btn');
    closeBtn.addEventListener('click', closePopup);
}

function closePopup() {
    popup.style.display = 'none';
}

loadMovies();
