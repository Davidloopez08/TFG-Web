const gallery = document.getElementById('gallery');
        const popup = document.getElementById('popup');
        const closePopupBtn = document.getElementById('close-popup');

        // Cargar las películas desde el archivo JSON
        function loadMovies() {
            fetch('http://localhost:3000/peliculas')  // Ruta del archivo JSON
                .then(response => response.json())
                .then(peliculas => {
                    // Mostrar las películas en la galería
                    renderMovies(peliculas);
                    
                    // Añadir el evento de clic en las películas
                    gallery.addEventListener('click', event => {
                        const movieId = event.target.closest('.gallery-item')?.dataset.id;
                        if (movieId) {
                            const pelicula = peliculas.find(p => p.id == movieId);
                            if (pelicula) {
                                showPopup(pelicula);
                            }
                        }
                    });
                })
                .catch(error => {
                    console.error('Error al cargar las películas:', error);
                });
        }

        // Mostrar las películas en la galería
        function renderMovies(peliculas) {
            gallery.innerHTML = peliculas.map(pelicula => `
                <div class="gallery-item" data-id="${pelicula.id}">
                    <img src="${pelicula.photo}" alt="${pelicula.title}">
                    <div class="title">${pelicula.title}</div>
                </div>
            `).join('');
        }

        // Mostrar el pop-up con la información de la película
        function showPopup(pelicula) {
            document.getElementById('popup-title').textContent = pelicula.title;
            document.getElementById('popup-year').textContent = pelicula.year;
            document.getElementById('popup-description').textContent = pelicula.description;
            document.getElementById('popup-category').textContent = pelicula.category;
            document.getElementById('popup-trailer').src = pelicula.url;
            popup.style.display = 'flex';
        }

        // Cerrar el pop-up
        closePopupBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            document.getElementById('popup-trailer').pause();
        });

        // Inicializar la carga de películas
        loadMovies();