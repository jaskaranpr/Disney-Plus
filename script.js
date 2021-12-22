let homeKey = "e27127dccd4825b81fa6d0cd45bef900";
let movieData;
// let url = "http://www.omdbapi.com/?i=tt3896198&apikey=948ecd16"
let url = "http://www.omdbapi.com/?s=batman&apikey=948ecd16";
let searchOut;
async function movieApi(url) {
  try {
    let api = await fetch(url);
    movieData = await api.json();
    displayovie(movieData.Search);
  } catch (res) {
    displayovie("Movie not found");
  }
}
//////////////////
let searchContent = document.querySelector(".search-content");
function displayovie(movies) {
  searchContent.innerHTML = "";
  movies.map(function (mov) {
    let searchRes = document.createElement("div");
    searchRes.classList.add("search-res");
    let img = document.createElement("img");
    img.src = mov.Poster;
    let div = document.createElement("div");
    div.classList.add("search-txt");
    let title = document.createElement("h1");
    title.textContent = mov.Title;
    let lag = document.createElement("h2");
    lag.textContent = `${mov.Type}, ${mov.Year}`;
    div.append(title, lag);
    searchRes.append(img, div);
    searchContent.append(searchRes);
    searchRes.addEventListener("click", function () {
      localStorage.setItem("movieId", JSON.stringify(mov.imdbID));
      location.href = "movie.html";
    });
  });
}

function debounce(fun, delay) {
  clearTimeout(searchOut);
  searchOut = setTimeout(function () {
    fun();
  }, delay);
}

document.querySelector("nav").addEventListener("click", function () {
  searchContent.innerHTML = "";
});

function inputSearch() {
  let val = document.querySelector("input").value.toLowerCase();
  url = `http://www.omdbapi.com/?s=${val}&apikey=948ecd16`;
  movieApi(url);
}
async function homePage() {
  url = `https://api.themoviedb.org/4/list/1?api_key=${homeKey}`;
  let res = await fetch(url);
  let data = await res.json();
  displayHome(data.results);
}
////////////////////////////////////
homePage();
let container = document.querySelector(".container");
function displayHome(data) {
  data.map(function (mov) {
    let main = document.createElement("div");
    main.classList.add("main");
    let txtDiv = document.createElement("div");
    txtDiv.classList.add("txtDiv1");
    let name = document.createElement("h1");
    name.textContent = `${mov.original_title} (${mov.original_language})`;
    let rate = document.createElement("h2");
    rate.innerHTML = `IMDB rate: <span>${mov.vote_average}</span> (${mov.popularity})`;
    let over = document.createElement("p");
    over.textContent = mov.overview;
    let watch = document.createElement("h3");
    watch.innerHTML = `<i class="fas fa-play"></i> Watch now`;
    txtDiv.append(name, rate, over, watch);
    main.append(txtDiv);
    main.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${mov.backdrop_path})`;
    container.append(main);
    main.addEventListener("mouseenter", function () {
      txtDiv.classList.remove("txtDiv1");
      main.classList.add("main-active");
    });
    main.addEventListener("mouseleave", function () {
      txtDiv.classList.add("txtDiv1");
      main.classList.remove("main-active");
    });
  });
}
///////////////////////slider
let pos = 0;
document.querySelector(".left").addEventListener("click", function () {
  pos += 20;
  if (pos > -2) {
    pos = -2;
  }
  container.style.left = `${pos}%`;
});
document.querySelector(".right").addEventListener("click", function () {
  if (pos > -240) {
    pos += -20;
  } else if (pos < -240) {
    pos = -247;
  }
  container.style.left = `${pos}%`;
});

let mainSlide = document.querySelector(".main-slide");
mainSlide.addEventListener("mouseenter", function () {
  document.querySelector(".left").classList.remove("btn-block");
  document.querySelector(".right").classList.remove("btn-block");
});
mainSlide.addEventListener("mouseleave", function () {
  document.querySelector(".left").classList.add("btn-block");
  document.querySelector(".right").classList.add("btn-block");
});

async function nextSide() {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${homeKey}&primary_release_year=2017&sort_by=revenue.desc`;
  let res = await fetch(url);
  let data = await res.json();
  nextSideDisplay(data.results);
}
nextSide();
let con2 = document.querySelector(".con2");
function nextSideDisplay(data) {
  data.map(function (mov) {
    let main = document.createElement("div");
    main.classList.add("main");
    let txtDiv = document.createElement("div");
    txtDiv.classList.add("txtDiv1");
    let name = document.createElement("h1");
    name.textContent = `${mov.original_title} (${mov.original_language})`;
    let rate = document.createElement("h2");
    rate.innerHTML = `IMDB rate: <span>${mov.vote_average}</span> (${mov.popularity})`;
    let over = document.createElement("p");
    over.textContent = mov.overview;
    let watch = document.createElement("h3");
    watch.innerHTML = `<i class="fas fa-play"></i> Watch now`;
    txtDiv.append(name, rate, over, watch);
    main.append(txtDiv);
    main.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${mov.backdrop_path})`;
    con2.append(main);
    main.addEventListener("mouseenter", function () {
      txtDiv.classList.remove("txtDiv1");
      main.classList.add("main-active");
    });
    main.addEventListener("mouseleave", function () {
      txtDiv.classList.add("txtDiv1");
      main.classList.remove("main-active");
    });
  });
}
let pos2 = 0;
document.querySelector(".left2").addEventListener("click", function () {
  pos2 += 20;
  if (pos2 > -2) {
    pos2 = -2;
  }
  con2.style.left = `${pos2}%`;
});
document.querySelector(".right2").addEventListener("click", function () {
  if (pos2 > -240) {
    pos2 += -20;
  } else if (pos2 < -240) {
    pos2 = -247;
  }
  con2.style.left = `${pos2}%`;
});
let mainS2 = document.querySelector(".main-s2");
mainS2.addEventListener("mouseenter", function () {
  document.querySelector(".left2").classList.remove("btn-block");
  document.querySelector(".right2").classList.remove("btn-block");
});
mainS2.addEventListener("mouseleave", function () {
  document.querySelector(".left2").classList.add("btn-block");
  document.querySelector(".right2").classList.add("btn-block");
});
///////////////////
async function topSlide() {
  let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=e27127dccd4825b81fa6d0cd45bef900`;
  let res = await fetch(url);
  let data = await res.json();
  disSildeTop(data.results);
}
topSlide();
let slide = document.querySelector(".slide");
function disSildeTop(data) {
  for (let i = 0; i < 5; i++) {
    let image = document.createElement("div");
    image.classList.add("image");
    let imgTxt = document.createElement("div");
    imgTxt.classList.add("imgTxt");
    let span = document.createElement("span");
    span.textContent = "SUBSCIBER";
    let title = document.createElement("h1");
    title.textContent = data[i].original_title;
    let type = document.createElement("h2");
    type.innerHTML = `Laguage: (${data[i].original_language}) ${data[i].release_date}`;
    let imdb = document.createElement("h3");
    imdb.innerHTML = `IMdb rate: ${data[i].vote_average} (${data[i].vote_count})`;
    let overview = document.createElement("p");
    overview.textContent = data[i].overview;
    let watch = document.createElement("h4");
    watch.innerHTML = `<i class="fas fa-play"></i> Watch now`;
    imgTxt.append(span, title, type, imdb, overview, watch);
    let img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500/${data[i].backdrop_path}`;
    image.append(imgTxt, img);
    slide.append(image);
  }
}
let slides = ["-18.6%", "-37.5%", "-56.4%", "-75.3%"];
let i = 0;
setInterval(function () {
  i++;
  if (i == 4) {
    i = 0;
  }
  slide.style.left = slides[i];
}, 4000);
