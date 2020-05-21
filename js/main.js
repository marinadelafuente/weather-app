const search = document.querySelector('.js-form');
const searchInput = document.querySelector('.js-input');

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
        })
        .catch(error => {
            console.log(error.message);
        })
    console.log(searchedCity);

}

search.addEventListener('submit', searchCity);