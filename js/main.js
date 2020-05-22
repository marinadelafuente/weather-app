const body = document.querySelector('body');
const search = document.querySelector('.js-form');
const searchInput = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const card = document.querySelector('.js-card');
const error = document.querySelector('.js-error');
const img = document.querySelector('.js-img');
const iconContainer = document.querySelector('.js-icon');
const city = document.querySelector('.js-city');
const weatherText = document.querySelector('.js-weather');
const temp = document.querySelector('.js-temp');


// update UI with API data
const updateInterface = (data) => {
    const cityName = data.cityName;
    const weather = data.weather;

    city.innerHTML = `${cityName.LocalizedName}, ${cityName.Country.LocalizedName}`
    weatherText.innerHTML = weather.WeatherText;
    temp.innerHTML = `${weather.Temperature.Metric.Value}&deg;C`;

    // hide/show the weather card info
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

    // daytime/nightime
    time = null;
    if (weather.IsDayTime) {
        time = "img/day.svg"
        card.classList.replace('bg-night-mode', 'bg-primary')
        btn.classList.replace('btn-outline-primary', 'btn-primary')
        city.classList.remove('text-white')
        weatherText.classList.remove('text-white')
        temp.classList.remove('text-white')
        iconContainer.classList.replace('icon-weather__night', 'icon-weather')

    } else {
        time = "img/night.svg"
        card.classList.replace('bg-primary', 'bg-night-mode')
        btn.classList.replace('btn-primary', 'btn-outline-primary')
        city.classList.add('text-white')
        weatherText.classList.add('text-white')
        temp.classList.add('text-white')
        iconContainer.classList.replace('icon-weather', 'icon-weather__night')
    }
    img.setAttribute('src', time)

    //weather icons
    const icons = `img/icon/${weather.WeatherIcon}.png`
    iconContainer.innerHTML = `<img src=${icons} alt="${weather.WeatherText} icon" class="icon"></img>`
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
const handlerSearch = (ev) => {
    ev.preventDefault();

    // get city value
    const searchedCity = searchInput.value; // search.search.value

    // error message to introduce city
    if (!searchedCity) {
        if (error.classList.contains('d-none')) {
            error.classList.remove('d-none')
        }

    } else {
        // get info from the API matching the city
        if (error.classList.contains('d-none') === false) {
            error.classList.add('d-none')
        }
        getApiInfo(searchedCity)
            .then(data => {
                console.log(data)
                updateInterface(data);
            })
            .catch(error => {
                alert('We cannot find that city. Please, try again.')
                search.reset();
                // body.innerHTML = `${error.message}`
                console.log(error.message);
            })
    }
}

search.addEventListener('submit', handlerSearch);