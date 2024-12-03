const APIKey = "316ead9d";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const getData = async (movieName) => {
    try {
        const fetchData = await fetch(`https://www.omdbapi.com/?apikey=${APIKey}&t=${movieName}`);
        const jsonData = await fetchData.json();

        if (jsonData.Response === "False") {
            document.querySelector(".card").innerHTML = "<h1>Enter a valid Movie Name</h1>";
            return;
        }

        const div = document.createElement("div");
        div.classList.add("movieCard");
        div.innerHTML = `
            <img src="${jsonData.Poster}" alt="${jsonData.Title}">
            <div class="cardText">
                <h1>${jsonData.Title}</h1>
                <p class="rating">Rating: <span>${jsonData.imdbRating}</span></p> 
                <p>Genre: <span>${jsonData.Genre}</span></p>
                <p>Release: <span>${jsonData.Released}</span></p>
                <p>Duration: <span>${jsonData.Runtime}</span></p>
                <p>Description: <span>${jsonData.Plot}</span></p>
            </div>
        `;

        document.querySelector(".card").innerHTML = "";
        document.querySelector(".card").appendChild(div);
    } catch (error) {
        document.querySelector(".card").innerHTML = "<h1>Something went wrong. Please try again!</h1>";
        console.error(error);
    }
};

searchBtn.addEventListener("click", () => {
    const movieName = searchInput.value.trim();
    if (movieName) {
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>Please enter a movie name</h1>";
    }
});
