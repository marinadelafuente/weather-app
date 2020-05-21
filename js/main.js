const search = document.querySelector('.js-form');
const searchInput = document.querySelector('.js-input');
const card = document.querySelector('.js-card');
const img = document.querySelector('.js-img');
const iconContainer = document.querySelector('.js-icon');
const city = document.querySelector('.js-city');
const weatherText = document.querySelector('.js-weather');
const temp = document.querySelector('.js-temp');
const btn = document.querySelector('.btn');

// update UI with API data
const updateInterface = (data) => {
    const cityName = data.cityName;
    const weather = data.weather;

    city.innerHTML = `${cityName.LocalizedName}, ${cityName.Country.LocalizedName}`
    weatherText.innerHTML = weather.WeatherText;
    temp.innerHTML = weather.Temperature.Metric.Value;

    // hide/show the weather card info
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

    // daytime/nightime
    time = null;
    if (weather.IsDayTime) {
        time = "img/day.svg"
        // img.src = img.src.replace("https://via.placeholder.com/400x300", "time");
    } else {
        // img.src = img.src.replace("https://via.placeholder.com/400x300", "time");
        time = "img/night.svg"
        card.classList.remove('bg-primary')
        card.classList.add('night-mode')
        btn.classList.remove('btn-primary')
        btn.classList.add('btn-outline-primary')

    }
    img.setAttribute('src', time)

    //weather icons
    const icons = `img/icons/${weather.WeatherIcon}.svg`
    console.log(icons);
    
    iconContainer.innerHTML = `<img src=${icons} alt="${weather.WeatherText} icon class="icon"></img>`
}

// get info from server
const getApiInfo = async (city) => {
    const cityName = await getCity(city);
    const weather = await getCurrentWeather(cityName.Key)

    return {
        cityName,
        weather
    };
}

// search for city
searchCity = (ev) => {
    ev.preventDefault();

    // get city value
    const searchedCity = searchInput.value; // search.search.value
    // search.reset();

    // get info from the API matching the city
    getApiInfo(searchedCity)
        .then(data => {
            console.log(data)
            updateInterface(data);
        })
        .catch(error => {
            console.log(error.message);
        })
    console.log(searchedCity);

}

search.addEventListener('submit', searchCity);