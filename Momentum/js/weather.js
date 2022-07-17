const weatherContainer = document.getElementById("weather");
const city = weatherContainer.querySelector("span:first-child");
const weather = weatherContainer.querySelector("span:last-child");

const LS_API_KEY = "api_key";

function extractWeatherInfo(lat, lon, API_KEY) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        console.log("loading weather...")
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
        city.innerText = data.name;
        localStorage.setItem(LS_API_KEY, JSON.stringify(API_KEY));
    });
}

function onGeoOk(position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    fetch("/keys/openweathermap.json").then(async res =>  {
        console.log("loading api key...")
        const API_KEY = await res.json();
        extractWeatherInfo(lat, lon, API_KEY);
    }).catch(e =>{
        let API_KEY = JSON.parse(localStorage.getItem(LS_API_KEY));
        if (API_KEY === null){
            API_KEY = prompt("You don't have any stored api key. Please input your openweathermap api key.");
        }
        extractWeatherInfo(lat, lon, API_KEY);
    });
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);