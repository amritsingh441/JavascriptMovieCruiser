var favMovieList;
function getMovies() {
	fetch("http://localhost:3000/movies").then(result => {
		if(result.status == 200){
			return Promise.resolve(result.json());
		}else{
			return Promise.reject("Rejecting promise. Could not resolve movie");
		}
	}).then(moviesData => {
		console.log("in getMovies :: "+moviesData);
		addMoviesDataToDOM(moviesData);
		return moviesData;
	}).catch(error => {
		throw new Error(error);
	});
	function addMoviesDataToDOM(moviesData){
		moviesData.forEach(movie => {
			//let linkCount = 0;
			let movieId = movie.id;
			const baseURL = "https://image.tmdb.org/t/p/original";
			let posterURL = movie.poster_path;
			let imgURL = baseURL + posterURL;
			let title = movie.title;

			//creating first div element and setting attributes
			let div1 = document.createElement("div");
			div1.setAttribute("class","card");
			div1.setAttribute("style","width: 18rem");

			let img1 = document.createElement("img");
			img1.setAttribute("class","card-img-top");
			img1.src = imgURL;

			let div2 = document.createElement("div");
			div2.setAttribute("class","card-body");

			let h5_1 = document.createElement("h5");
			h5_1.textContent = title;

			let link1 = document.createElement("a");
			link1.setAttribute("class","btn btn-primary");
			link1.textContent = "Add to Favorites";
			link1.id=movieId;
			link1.addEventListener("click",()=>{
				addFavourite(movie,event);
			});
			div2.appendChild(img1);
			div2.appendChild(h5_1);
			div2.appendChild(link1);
			div1.appendChild(div2);
			document.getElementById("moviesList").appendChild(div1);
			
		});
		}
}
function getFavourites() {
	//document.getElementById("favouritesList").remove();
	 fetch("http://localhost:3000/favourites").then(favMovie => {
	 	if(favMovie.status == 200){
			//document.getElementById("favouritesList").remove();
			return Promise.resolve(favMovie.json());
		}else{
	 		return Promise.reject("Rejecting promise. Could not resolve favourites.");
		}
	 }).then(favMoviesData =>{
		console.log("in getFavourites :: "+favMoviesData);
		addFavMoviesDataToDOM(favMoviesData);
		favMovieList = favMoviesData;
		return favMoviesData;
	}).catch(error => {
		throw new Error(error);
	});
	
	function addFavMoviesDataToDOM(favMoviesData){
		//document.getElementById("favouritesList").
		console.log("in addFavMoviesDataToDOM :: "+favMoviesData);
		favMoviesData.forEach(movie => {
			//let linkCount = 0;
			if(favMovieList!=null && favMovieList!=undefined){
				favMovieList.forEach(movies => {
					if(movies.id == movie.id){
						return;
					}
				})
			}
			let movieId = movie.id;
			const baseURL = "https://image.tmdb.org/t/p/original";
			let posterURL = movie.poster_path;
			let imgURL = baseURL + posterURL;
			let title = movie.title;

			//creating first div element and setting attributes
			let div1 = document.createElement("div");
			div1.setAttribute("class","card");
			div1.setAttribute("style","width: 18rem");

			let img1 = document.createElement("img");
			img1.setAttribute("class","card-img-top");
			img1.src = imgURL;

			let div2 = document.createElement("div");
			div2.setAttribute("class","card-body");

			let h5_1 = document.createElement("h5");
			h5_1.textContent = title;
			div2.appendChild(img1);
			div2.appendChild(h5_1);
			div1.appendChild(div2);
			document.getElementById("favouritesList").appendChild(div1);
			
		});
		}
}

function addFavourite(movie,event) {
	console.log(event);
fetch('http://localhost:3000/favourites', 
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(movie),
}).then((response) => {
	if(response.status == 201){
	//getFavourites();
	//addFavMoviesDataToDOM(newlyAddedMovie);
	return response.json();
	 //return Promise.resolve("Added to fav movie list :: "+response.json());
	}else{
		return Promise.reject("Error in adding fav movie");
	}
})
 .then((newlyAddedMovie) =>{
	 //addFavMoviesDataToDOM(newlyAddedMovie);
	 getFavourites()
 	return addedMovie;
 })
.catch((error) => {
  return new Error(error);
});
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


