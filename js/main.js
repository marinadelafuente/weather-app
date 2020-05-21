const search = document.querySelector('.js-form');
const searchInput = document.querySelector('.js-input');
const card = document.querySelector('.js-card');
const img = document.querySelector('.js-img');
const icon = document.querySelector('.js-icon');
const city = document.querySelector('.js-city');
const weatherText = document.querySelector('.js-weather');
const temp = document.querySelector('span');

// update UI
const updateInterface = (data) => {
    city.innerHTML = data.cityName.LocalizedName;
    weatherText.innerHTML = data.weather.WeatherText;
    temp.innerHTML = data.weather.Temperature.Metric.Value;
    icon.innerHTML = data.weather.WeatherIcon;

    // hide/show the weather card info
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
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
    search.reset();

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