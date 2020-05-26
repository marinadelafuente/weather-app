const key = "32cO9BXL9E5vkW2Ngpt83vir7B3ARJCq";

const getCurrentWeather = async (locationKey) => {
  const response = await fetch(
    `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`
  );
  if (response.status !== 200) {
    location.href = "../errorPage.html";
    throw new Error("cannot fetch the data");
  }
  const data = await response.json();

  return data[0];
};

const getCity = async (city) => {
  const response = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`
  );
  if (response.status !== 200) {
    location.href = "../errorPage.html";
    throw new Error("cannot fetch the data");
  }
  const data = await response.json();
  return data[0];
};
