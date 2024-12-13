const gallery = document.getElementById('gallery');
        const popup = document.getElementById('popup');
        const closePopupBtn = document.getElementById('close-popup');

        function loadMovies() {
            fetch('http://localhost:3000/peliculas')
                .then(response => response.json())
                .then(peliculas => {

                    renderMovies(peliculas);
                    

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


        function renderMovies(peliculas) {
            gallery.innerHTML = peliculas.map(pelicula => `
                <div class="gallery-item" data-id="${pelicula.id}">
                    <img src="${pelicula.photo}" alt="${pelicula.title}">
                    <div class="title">${pelicula.title}</div>
                </div>
            `).join('');
        }

        function showPopup(pelicula) {
            document.getElementById('popup-title').textContent = pelicula.title;
            document.getElementById('popup-year').textContent = pelicula.year;
            document.getElementById('popup-description').textContent = pelicula.description;
            document.getElementById('popup-category').textContent = pelicula.category;
            document.getElementById('popup-trailer').src = pelicula.url;
            popup.style.display = 'flex';
        }

        closePopupBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            document.getElementById('popup-trailer').pause();
        });

        loadMovies();