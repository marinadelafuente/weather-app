// const key = "RzCqMMQvlhOSuslC2w5KFtqQVj1FV8vS";

// const getCity = async (city) => {
//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;
//     // 1.starts with ?   2. first parameter: key  3.'&' to add another parameter  4.second parameter that is going to change and we are going to give the argument

//     const response = await fetch(base + query)
//     const data = await response.json();

//     console.log(data);

// }

// getCity('manchester')





const key = "KhzTLf5knMzxZBhIv0hEf2wMIncPxlOP";

const getCurrentWeather = async (locationKey) => {
    const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`);
    if (response.status !== 200) {
        throw new Error('cannot fetch the data');
    }
    const data = await response.json();

    return data[0];
}

const getCity = async (city) => {
    const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`);
   if (response.status !== 200) {
       throw new Error('cannot fetch the data');
   }
    const data = await response.json();
    return data[0];
};

// getCity('manchester')
//     .then(data => {
//         const locationKey = data.Key;
//         return getCurrentWeather(locationKey);
//     })
//     .then(data => {
//         const temperature = data.Temperature.Metric.Value;
//         const weather = data.WeatherText;
//         console.log(temperature, weather);

//         return temperature, weather;
//     })
//     .catch(error => console.log(error));



// getCurrentWeather('329260')