document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const movieResults = document.getElementById("movie-results");
    const movieDetails = document.getElementById("movie-details");
    const backButton = document.getElementById("back-button");

    searchButton.addEventListener("click", function() {
        const query = searchInput.value;

        if (query.trim() === "") {
            alert("Por favor, ingresa el nombre de una película.");
            return;
        }

        // Llamar a la función para buscar películas
        searchMovies(query);
    });

    backButton.addEventListener("click", function() {
            // Redirigir a la página principal
            window.location.href = "index.html";
    });

    function searchMovies(query) {
        const apiKey = '2ef0ce59'; 
        const apiUrl = `https://www.omdbapi.com/?s=${query}&type=movie&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    displayMovies(data.Search);
                } else {
                    movieResults.innerHTML = "No se encontraron películas.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                movieResults.innerHTML = "Ocurrió un error al buscar películas.";
            });
    }

    function displayMovies(movies) {
        movieResults.innerHTML = "";

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";

            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>Año: ${movie.Year}</p>
                <button class="details-button" data-imdbid="${movie.imdbID}">Ver detalles</button>
            `;

            movieResults.appendChild(movieCard);
        });

       
        const detailsButtons = document.querySelectorAll(".details-button");
        detailsButtons.forEach(button => {
            button.addEventListener("click", function() {
                const imdbID = this.getAttribute("data-imdbid");
                showMovieDetails(imdbID);
            });
        });
    }

    function showMovieDetails(imdbID) {
        const apiKey = '2ef0ce59'; 
        const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const movieHTML = `
                    <h2>${data.Title}</h2>
                    <p>Año: ${data.Year}</p>
                    <p>Género: ${data.Genre}</p>
                    <p>Director: ${data.Director}</p>
                    <p>Actores: ${data.Actors}</p>
                    <p>Descripción: ${data.Plot}</p>
                `;

                movieDetails.innerHTML = movieHTML;
                movieResults.style.display = "none";
                movieDetails.style.display = "block";
                backButton.style.display = "block";
            })
            .catch(error => {
                console.error("Error:", error);
                movieDetails.innerHTML = "No se pudieron cargar los detalles de la película.";
            });
    }
});
