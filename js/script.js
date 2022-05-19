var movies = [];
var moviesFilter = [];

const getMovies = () => {
    for (var i = 1; i <= 25; i++) {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=31a6b04aa1998c68277f38fdcec14676&language=es-ES&page=" + i)
        .then(response => response.json())
        .then(data => {
        arr1 = data.results;
        arr2 = data.results;

        movies.push(...arr1);
        moviesFilter.push(...arr2);

        listPopularMovies(movies);
    });
    }
}

// Buscador de películas
document.querySelector("#movie-search").addEventListener("keyup", (evt) => {

    if (evt.target.value.length > 2) {

        let result = moviesFilter.filter( (movie) => 
            movie.title.toLowerCase().includes(evt.target.value.toLowerCase())
        );
        listPopularMovies(result);
    }
    else {
        listPopularMovies(movies);
    }

});


const reverseButton = () => {

    document.querySelector("#show-reverse-button").innerHTML = '';

    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-danger", "ms-2");
    btn.setAttribute("id", "reverse-btn");

    let icon = document.createElement("i");
    icon.classList.add("bi", "bi-arrow-down-up");
    btn.append(icon);

    document.querySelector("#show-reverse-button").append(btn);

    document.querySelector("#reverse-btn").addEventListener("click", () => {
        moviesFilter.reverse();
        listPopularMovies(moviesFilter);
    });

};

// No filtro
document.querySelector("#no-filter").addEventListener("click", () => {
    document.querySelector("#show-reverse-button").innerHTML = '';
    document.querySelector("#list").innerHTML = '';
    document.getElementById("dropdownMenuButton1").innerText = "Filtro: ";

    getMovies();
});

// Alphabetical order
document.querySelector("#alphabetical").addEventListener("click", () => {
    
    moviesFilter.sort((a,b) => a.title > b.title ? 1 : -1);
    document.getElementById("dropdownMenuButton1").innerText = "Filtro: Alfabéticamente";
    reverseButton();

    listPopularMovies(moviesFilter);
});

// Mejor rating
document.querySelector("#rating").addEventListener("click", () => {
    moviesFilter.sort((a,b) => a.vote_average > b.vote_average ? -1 : 1);
    document.getElementById("dropdownMenuButton1").innerText = "Filtro: Puntuación";
    reverseButton();

    listPopularMovies(moviesFilter);
});

// Mejor popularidad
document.querySelector("#popularity").addEventListener("click", () => {
    moviesFilter.sort((a,b) => a.popularity > b.popularity ? -1 : 1);
    document.getElementById("dropdownMenuButton1").innerText = "Filtro: Popularidad";
    reverseButton();
    listPopularMovies(moviesFilter);
});


const listPopularMovies = (movies) => {
    
    document.getElementById("list").innerHTML = '';
    for (const movie in movies) {

        let div = document.createElement("div");
        div.classList.add("col-4", "mt-4");

        let card = document.createElement("div");
        card.classList.add("card");
        // modal config
        card.setAttribute("data-bs-toggle", "modal");
        card.setAttribute("data-bs-target", "#movieModal");
        card.setAttribute("id", "modal-link");

        // modal

        card.dataset.title = movies[movie].title;
        card.dataset.id = movies[movie].id;
        
        card.dataset.overview = movies[movie].overview;
        card.dataset.release_date = movies[movie].release_date;
        card.dataset.adult = movies[movie].adult;
        card.dataset.vote_average = movies[movie].vote_average;
        card.dataset.poster_path = movies[movie].poster_path;
        card.dataset.backdrop_path = movies[movie].backdrop_path;

        card.addEventListener("click", movieModal)

        // ---

        let img = document.createElement("img");
        img.classList.add("card-img-top","img-thumbnail");
        img.setAttribute("src", "http://image.tmdb.org/t/p/w500/" + movies[movie].poster_path);
       

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title", "fw-bolder");
        cardTitle.innerText = movies[movie].title;

        cardBody.append(cardTitle);

        let description = document.createElement("p");
        description.classList.add("card-text");


        let movieDescription = movies[movie].overview;
        lettersNumber = movieDescription.length;

    

        if (lettersNumber > 140) {
            cutText = movieDescription.slice(0, -(lettersNumber-140));
            description.innerHTML = cutText + '... <a href="#" data-bs-toggle="modal" data-bs-target="#movieModal" id="modal-link">Leer más.</a>';
        }
        else {
            description.innerHTML = movieDescription + '... <a href="#">Leer más.</a>';
        }

    
        cardBody.append(description);

        let date = document.createElement("p");
        date.classList.add("card-text", "fw-light");
        date.innerText = "Fecha de lanzamiento: " + movies[movie].release_date;

        cardBody.append(date);


        let adult = document.createElement("p");
        adult.classList.add("card-text", "font-monospace");
        if (movies[movie].adult == true) {
            adult.innerText = "Solo mayores de edad";
            
        }
        else {
            adult.innerText = "Para todo público";
        };

        cardBody.append(adult);

        let progress = document.createElement("div");
        progress.classList.add("progress");

        let progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar", "progress-bar-striped");

        let rate = movies[movie].vote_average;

        if (rate <= 6) {
            progressBar.classList.add("bg-danger");
        }
        else if (rate <= 7) {
            progressBar.classList.add("bg-warning");
        }
        else if (rate <= 8) {
            progressBar.classList.add("bg-success");
        }
        else {
            progressBar.classList.add("bg-primary");
        }
        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("aria-valuenow", "10");
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuenmax", "100");
        
        progressBar.style.width = '' + rate*10 + '%';

        progress.append(progressBar);
        cardBody.append(progress);

        let score = document.createElement("p");
        score.classList.add("text-center")
        score.innerText = "Puntuación: " + movies[movie].vote_average;

        cardBody.append(score);

        card.append(img);
        card.append(cardBody)
        div.append(card);
        
        
        document.querySelector("#list").append(div);

    };

}


const movieModal = (evt) => {

    let info = evt.currentTarget.dataset;


    document.querySelector("#modal-img").setAttribute("src", "http://image.tmdb.org/t/p/w500/" + info.backdrop_path);
    document.querySelector("#modal-title").innerText = info.title;
    document.querySelector("#modal-description").innerText = info.overview;
    document.querySelector("#modal-date").innerText = "Fecha de lanzamiento: " + info.release_date;

    let favButton = document.querySelector("#fav-btn");
    favButton.dataset.title = info.title;
    favButton.dataset.id = info.id;
    favButton.addEventListener("click", () => {
        localStorage.setItem(favButton.dataset.id, favButton.dataset.title);
    });
}

document.querySelector("#fav-list").addEventListener("click", () => {

    document.querySelector("#favs-movies").innerText = '';
    
    for (var i in localStorage) {
    
        if(typeof(localStorage[i]) == 'string') {
            
            let p = document.createElement("p");
            p.innerHTML = '<i class="bi bi-star-fill"></i>  ' + localStorage[i];
            document.querySelector("#favs-movies").append(p);
        }

    }
});

getMovies()