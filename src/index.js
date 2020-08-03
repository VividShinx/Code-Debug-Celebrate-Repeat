function wrapFix() {
  let ima = new Date();
  let timeyTime = document.querySelector("#currentTime");

  timeyTime.innerHTML = `${dayDisplay(ima)} ${realTime(ima)}`;

  let citySwap = document.querySelector(".search-Button");
  citySwap.addEventListener("click", showCity);

  showTemp("Brisbane");
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
  let hours = ("0" + date.getHours()).slice("-2");
  let mins = ("0" + date.getMinutes()).slice("-2");

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

function showTemp(userInput) {
  let apiKey = "8d4839403aa07421d58048909aa1a93b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=8d4839403aa07421d58048909aa1a93b&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(typeHere);
}

function metricChange() {
  let tempval = document.querySelector("#tempSection");
  let theRestOfIt = tempval.innerHTML.slice(0, -2);
  let theLastCharacter = tempval.innerHTML.slice(-1)[0]; //Get the C or the F
  if (theLastCharacter == "F") {
    tempval.innerHTML = `${theRestOfIt}°C`;
  } else {
    tempval.innerHTML = `${theRestOfIt}°F`;
  }
  let theCity = document.querySelector("#cityChange").innerHTML;
  showTemp(theCity);
}

function typeHere(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElem = document.querySelector(".temp");
  let theRestOfIt = tempElem.innerHTML.slice(0, -2);
  let theLastCharacter = tempElem.innerHTML.slice(-1)[0]; //Get the C or the F
  if (theLastCharacter == "F") {
    temperature = Math.round(temperature * (9 / 5) + 32);
    tempElem.innerHTML = `${temperature}°F`;
  } else {
    tempElem.innerHTML = `${temperature}°C`;
  }

  let descript = document.querySelector("#descriptWeather");
  descript.innerHTML = response.data.weather[0].description;

  let winSpeed = Math.round(response.data.wind.speed);
  if (theLastCharacter == "F") {
    winSpeed = Math.round(winSpeed / 1.609);
    document.querySelector("#wind").innerHTML = `${winSpeed} MI/H`;
  } else {
    document.querySelector("#wind").innerHTML = `${winSpeed} KM/H`;
  }
  document.querySelector("#Humid").innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";

  let minTemp = Math.round(response.data.main.temp_min);
  if (theLastCharacter == "F") {
    minTemp = Math.round(minTemp * (9 / 5) + 32);
    document.querySelector(
      "#minTemp"
    ).innerHTML = `Minimum Temperature: ${minTemp}°F`;
  } else {
    document.querySelector(
      "#minTemp"
    ).innerHTML = `Minimum Temperature: ${minTemp}°C`;
  }
  let maxTemp = Math.round(response.data.main.temp_max);
  if (theLastCharacter == "F") {
    maxTemp = Math.round(maxTemp * (9 / 5) + 32);
    document.querySelector(
      "#maxTemp"
    ).innerHTML = `Maximum Temperature: ${maxTemp}°F`;
  } else {
    document.querySelector(
      "#maxTemp"
    ).innerHTML = `Maximum Temperature: ${maxTemp}°C`;
  }
  let iconElement = document.querySelector("#iconPic");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
