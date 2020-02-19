var favMovieList = [];
var movieList = [];
function getMovies() {
	return fetch("http://localhost:3000/movies").then(result => {
		if (result.status == 200) {
			return Promise.resolve(result.json());
		} else {
			return Promise.reject("Rejecting promise. Could not resolve movie");
		}
	}).then(moviesData => {
		console.log("in getMovies :: " + moviesData);
		movieList = moviesData;
		addMoviesDataToDOM();
		return moviesData;
	}).catch(error => {
		throw new Error(error);
	});

}

function addMoviesDataToDOM() {
		movieList.forEach(movie => {
		const baseURL = "https://image.tmdb.org/t/p/original";
		let posterURL = movie.poster_path;
		let imgURL = baseURL + posterURL;
		let title = movie.title;

		//creating first div element and setting attributes
		let div1 = document.createElement("div");
		div1.setAttribute("class", "card");
		div1.setAttribute("style", "width: 18rem");

		let img1 = document.createElement("img");
		img1.setAttribute("class", "card-img-top");
		img1.src = imgURL;

		let div2 = document.createElement("div");
		div2.setAttribute("class", "card-body");

		let h5_1 = document.createElement("h5");
		h5_1.textContent = title;

		let link1 = document.createElement("a");
		link1.setAttribute("class", "btn btn-primary");
		link1.textContent = "Add to Favorites";
		link1.addEventListener("click", () => {
			addFavourite(movie.id);
		});
		div2.appendChild(img1);
		div2.appendChild(h5_1);
		div2.appendChild(link1);
		div1.appendChild(div2);
		document.getElementById("moviesList").appendChild(div1);
	});
}

function getFavourites() {
	return fetch("http://localhost:3000/favourites")
	.then(response => {
		if (response.status == 200) {
			return response.json();
		} else {
			return Promise.reject("Rejecting promise. Could not resolve favourites.");
		}
	})
	.then(favMoviesData => {
		console.log("in getFavourites :: " + favMoviesData);
		favMovieList = favMoviesData;
		addFavMoviesDataToDOM(favMovieList);
		return favMoviesData;
	})
	.catch(error => {
		throw new Error(error);
	});
}

function addFavMoviesDataToDOM(tempList) {
	return tempList.forEach(movie => {
		const baseURL = "https://image.tmdb.org/t/p/original";
		let posterURL = movie.poster_path;
		let imgURL = baseURL + posterURL;
		let title = movie.title;

		//creating div element and setting attributes
		let div1 = document.createElement("div");
		div1.setAttribute("class", "card");
		div1.setAttribute("style", "width: 18rem");
		//creating img element and setting attributes
		let img1 = document.createElement("img");
		img1.setAttribute("class", "card-img-top");
		img1.src = imgURL;
		//creating div element and setting attributes
		let div2 = document.createElement("div");
		div2.setAttribute("class", "card-body");
		//creating header element and setting attributes
		let h5_1 = document.createElement("h5");
		h5_1.textContent = title;
		div2.appendChild(img1);
		div2.appendChild(h5_1);
		div1.appendChild(div2);
		document.getElementById("favouritesList").appendChild(div1);
	});
}

function addFavourite(movieId) {
	let needToAddMovie = movieList.filter(m => {
		return m.id === movieId;
	})
	let needToAddMovieExisted = favMovieList.filter(m => {
		return m.id === movieId;
	})
	if (needToAddMovieExisted.length > 0) {
		throw new Error("Movie is already added to favourites");
	} else {
	return	fetch('http://localhost:3000/favourites',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(needToAddMovie[0]),
			})
			.then((response) => {
				if (response.status == 201 || response.status == 200) {
					return response.json();
				} else {
					return Promise.reject("Error in adding fav movie");
				}
			})
			.then((newlyAddedMovie) => {
				let tempList=[];
				tempList.push(newlyAddedMovie);
				addFavMoviesDataToDOM(tempList);
				favMovieList.push(newlyAddedMovie);
				return favMovieList;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
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


