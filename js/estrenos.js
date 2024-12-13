document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3001/peliculas')
      .then(response => response.json())
      .then(peliculas => {
        const contenedor = document.getElementById('movie-container');
  
        peliculas.forEach(pelicula => {
          const peliculaDiv = document.createElement('div');
          peliculaDiv.classList.add('movie-card');
  
          const imagen = document.createElement('img');
          imagen.src = pelicula.photo;
          imagen.alt = pelicula.title;
  
          const movieInfo = document.createElement('div');
          movieInfo.classList.add('movie-info');
  
          const titulo = document.createElement('h3');
          titulo.textContent = pelicula.title;
  
          const año = document.createElement('p');
          año.textContent = `Estreno el ${pelicula.year}`;
  
          const descripcion = document.createElement('p');
          descripcion.textContent = pelicula.description;
  
          movieInfo.appendChild(titulo);
          movieInfo.appendChild(año);
          movieInfo.appendChild(descripcion);
  
          peliculaDiv.appendChild(imagen);
          peliculaDiv.appendChild(movieInfo);
  
          contenedor.appendChild(peliculaDiv);
          console.log(pelicula.photo)
        });
      })
      .catch(error => console.log('Error al cargar las películas:', error));
});
