const body = document.querySelector("body");
const search = document.querySelector(".js-form");
const searchInput = document.querySelector(".js-input");
const btn = document.querySelector(".js-btn");
const card = document.querySelector(".js-card");
const error = document.querySelector(".js-error");
const img = document.querySelector(".js-img");
const iconContainer = document.querySelector(".js-icon-container");
const city = document.querySelector(".js-city");
const weatherText = document.querySelector(".js-weather");
const temp = document.querySelector(".js-temp");
const loaderContainer = document.querySelector(".progress");
const loader = document.querySelector(".progress-bar");

const getLocalStorage = () => {
  if (localStorage.getItem("searchedCity")) {
    searchedCity = localStorage.getItem("searchedCity");
    getData();
  }
};

const getData = () => {
  getApiInfo(searchedCity)
    .then((data) => {
      updateInterface(data);
    })
    // if error
    .catch((error) => {
      loaderContainer.classList.add("d-none");
      search.reset();

      if (error.message === "Failed to fetch") {
        location.href = "errorPage.html";
      } else {
        // alert("We cannot find that city. Please, try again.");
        card.classList.add("d-none");
        console.log(error.message);
      }
    });
};

// update UI with API data
const updateInterface = (data) => {
  // hide loader
  loaderContainer.classList.add("d-none");

  //destructuring properties
  const { cityName, weather } = data;
  city.innerHTML = `${cityName.LocalizedName}, ${cityName.Country.LocalizedName}`;
  weatherText.innerHTML = weather.WeatherText;
  temp.innerHTML = `${weather.Temperature.Metric.Value}&deg;C`;

  // hide/show the weather card info
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  // daytime/nightime
  time = null;
  if (weather.IsDayTime) {
    time = "img/day.svg";
    card.classList.replace("bg-night-mode", "bg-primary");
    btn.classList.replace("btn-outline-primary", "btn-primary");
    card.classList.remove("text-white");
    iconContainer.classList.remove("icon-container__night");
  } else {
    time = "img/night.svg";
    card.classList.replace("bg-primary", "bg-night-mode");
    btn.classList.replace("btn-primary", "btn-outline-primary");
    card.classList.add("text-white");
    iconContainer.classList.add("icon-container__night");
  }
  img.setAttribute("src", time);

  // weather icons
  const icons = `img/icon/${weather.WeatherIcon}.png`;
  iconContainer.innerHTML = `<img src=${icons} alt="${weather.WeatherText} icon" class="icon"></img>`;
};

// get info from server
const getApiInfo = async (city) => {
  const cityName = await getCity(city);
  const weather = await getCurrentWeather(cityName.Key);

  return {
    cityName,
    weather,
  };
};

// search for city
const handlerSearch = (ev) => {
  ev.preventDefault();

  // show loader while waiting for data
  loaderContainer.classList.remove("d-none");

  // get city value
  let searchedCity = searchInput.value; // search.search.value

  // show error message when empty
  if (!searchedCity) {
    if (error.classList.contains("d-none")) {
      error.classList.remove("d-none");
    }
  } else {
    // hide error message when empty
    if (error.classList.contains("d-none") === false) {
      error.classList.add("d-none");
    }
    //get info from the API matching the city
    getApiInfo(searchedCity)
      .then((data) => {
        console.log(data);
        updateInterface(data);
      })
      // if error
      .catch((error) => {
        loaderContainer.classList.add("d-none");
        search.reset();

        if (error.message === "Failed to fetch") {
          location.href = "../errorPage.html";
        } else {
          alert("We cannot find that city. Please, try again.");
          card.classList.add("d-none");
          console.log(error.message);
        }
      });
  }
  // set local storage
  localStorage.setItem("searchedCity", searchedCity);
};


search.addEventListener("submit", handlerSearch);

getLocalStorage();
