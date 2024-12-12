document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3001/peliculas')
      .then(response => response.json()) // Convierte la respuesta en un objeto JSON
      .then(peliculas => {
        const contenedor = document.getElementById('movie-container'); // Un contenedor para mostrar las películas
  
        peliculas.forEach(pelicula => {
          const peliculaDiv = document.createElement('div');
          peliculaDiv.classList.add('movie-card'); // Asegúrate de que las clases coincidan
  
          // Crear el contenido de cada película
          const imagen = document.createElement('img');
          imagen.src = pelicula.photo;
          imagen.alt = pelicula.title;
  
          const movieInfo = document.createElement('div');
          movieInfo.classList.add('movie-info');
  
          const titulo = document.createElement('h3');
          titulo.textContent = pelicula.title;
  
          const año = document.createElement('p');
          año.textContent = `Año: ${pelicula.year}`;
  
          const descripcion = document.createElement('p');
          descripcion.textContent = pelicula.description;
  
          const enlace = document.createElement('a');
          enlace.href = pelicula.url;
          enlace.textContent = 'Ver tráiler';
  
          // Añadir los elementos a la información de la película
          movieInfo.appendChild(titulo);
          movieInfo.appendChild(año);
          movieInfo.appendChild(descripcion);
          movieInfo.appendChild(enlace);
  
          // Añadir la imagen y la información al contenedor de la tarjeta
          peliculaDiv.appendChild(imagen);
          peliculaDiv.appendChild(movieInfo);
  
          // Añadir la tarjeta de película al contenedor
          contenedor.appendChild(peliculaDiv);
          console.log(pelicula.photo)
        });
      })
      .catch(error => console.log('Error al cargar las películas:', error));
});
