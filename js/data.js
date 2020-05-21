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

