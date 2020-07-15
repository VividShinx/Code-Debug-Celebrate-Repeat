function wrapFix() {
  let ima = new Date();
  let timeyTime = document.querySelector("#currentTime");

  timeyTime.innerHTML = `${dayDisplay(ima)} ${realTime(ima)}`;

  let citySwap = document.querySelector(".search-Button");
  citySwap.addEventListener("click", showCity);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink = addEventListener("click", toCelsius);

  let farenLink = document.querySelector("#faren-link");
  farenLink = addEventListener("click", toFaren);
}

function dayDisplay(date) {
  let nDay = [];
  nDay[0] = "Sunday";
  nDay[1] = "Monday";
  nDay[2] = "Tuesday";
  nDay[3] = "Wednesday";
  nDay[4] = "Thursday";
  nDay[5] = "Friday";
  nDay[6] = "Saturday";
  let currDay = nDay[date.getDay()];
  return currDay;
}

function realTime(date) {
  let hours = date.getHours();
  let mins = date.getMinutes();

  let timestring = `${hours}:${mins}`;
  return timestring;
}

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#cityChange");
  let replacement = document.querySelector("#mySearchBar");
  input.innerHTML = `${replacement.value}`;
  showTemp(replacement.value);
}

// On your project, when a user searches for a city 
// it should display the name of the city on the result 
// page and the current temperature of the city.

function showTemp(userInput) {
  let apiKey = "8d4839403aa07421d58048909aa1a93b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=8d4839403aa07421d58048909aa1a93b&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(typeHere);   
}

function typeHere (response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
  let tempElem = document.querySelector(".temp");
  tempElem.innerHTML = `${temperature}`;
  let descript = document.querySelector("#descriptWeather");
  descript.innerHTML = response.data.weather[0].description;

}