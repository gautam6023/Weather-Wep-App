let city;
// let showdataHTML = document.getElementById("showWeather").innerHTML;
async function getWeather() {
  try {
    city = document.getElementById("city").value;

    //Key =85f990cdfc2094625437070b3f3b2977
    //API - api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=85f990cdfc2094625437070b3f3b2977&units=metric`;

    let res = await fetch(url); //This gives currant data in which i am taking lat and lon
    let data = await res.json();

    let lat = data.coord.lat;
    let lon = data.coord.lon;

    let url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=85f990cdfc2094625437070b3f3b2977&units=metric`;
    let res1 = await fetch(url1); //here i am getting daily data by adding lat and lon into one call API
    let data1 = await res1.json();

    let dayArray = data1.daily;
    console.log(dayArray);

    selectDay(dayArray);
  } catch (err) {
    console.log(err);
    showErr();
  }
}

let days = document.querySelector("#days");
let cityId = document.getElementById("place");
let today = document.getElementById("today");
let sunRise = document.getElementById("sunRise");
let container = document.getElementById("data");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");

let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let sunrise = document.getElementById("sunRise");
let sunset = document.getElementById("sunSet");
let pressure = document.getElementById("pressure");
let dewPoint = document.getElementById("dewP");
let cloud = document.getElementById("cloud");
let toDay = document.getElementById("today");
let numDay = 1;
function selectDay(data) {
  // let con = document.getElementById("showData");
  // con.append(showdataHTML);
  days.innerHTML = null;
  data.map(function (el, i) {
    let div = document.createElement("div");
    div.setAttribute("class", "days");

    let day = document.createElement("p");
    day.innerText = `Day ${i + 1}`;

    let p = document.createElement("p");
    let date = getMyDate(el.dt);
    p.innerText = `${date[0]}`;

    let dayName = document.createElement("p");
    dayName.innerText = date[1];

    let icon = document.createElement("span");
    icon.setAttribute("class", "daysIcon");
    icon.innerHTML = '<i class="fa-solid fa-sun"></i>';
    div.append(day, p, dayName, icon);

    days.append(div);

    div.addEventListener("click", function () {
      showData(el, date);
    });

    //Shpwing First Day Data By Default;
    let dateD = getMyDate(data[0].dt);

    cityId.innerText = `${city}`;
    toDay.innerText = today.innerText = `${dateD[0]}, ${dateD[1]}`;
    maxTemp.innerText = `${data[0].temp.max}°C`;
    minTemp.innerText = `${data[0].temp.min}°C`;
    wind.innerText = `${data[0].wind_speed}km/h`;
    humidity.innerText = `${data[0].humidity}%`;
    pressure.innerText = `${data[0].pressure}mb`;
    dewPoint.innerText = `${data[0].dew_point}°`;
    cloud.innerText = `${data[0].clouds}`;

    let sunRiseTime = toHumanFormat(data[0].sunrise);
    let sunSetTime = toHumanFormat(data[0].sunset);

    sunrise.innerText = `${sunRiseTime}`;
    sunset.innerText = `${sunSetTime}`;
    let map = document.querySelector("#gmap_canvas");
    map.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  });
}

function showData(data, date) {
  // container.innerHTML = null;

  cityId.innerText = ` ${city}`;
  today.innerText = `${date[0]}, ${date[1]}`;

  maxTemp.innerText = `${data.temp.max}°C`;
  minTemp.innerText = `${data.temp.min}°C`;
  wind.innerText = `${data.wind_speed}km/h`;
  humidity.innerText = `${data.humidity}%`;
  pressure.innerText = `${data.pressure}mb`;
  dewPoint.innerText = `${data.dew_point}°`;
  cloud.innerText = `${data.clouds}`;
  let sunRiseTime = toHumanFormat(data.sunrise);
  let sunSetTime = toHumanFormat(data.sunset);

  sunrise.innerText = `${sunRiseTime}`;
  sunset.innerText = `${sunSetTime}`;

  let map = document.querySelector("#gmap_canvas");
  map.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

function toHumanFormat(str) {
  let dateObj = new Date(str * 1000);
  let time;

  let hrs = dateObj.getHours().toString().padStart(2, 0);
  let min = dateObj.getMinutes().toString().padStart(2, 0);
  let sec = dateObj.getSeconds().toString().padStart(2, 0);

  return (time = `${hrs}:${min}:${sec}`);
}

function getMyDate(str) {
  let date = new Date(str * 1000);

  let day = date.getDate().toString().padStart(2, 0);
  let month = date.getMonth().toString().padStart(2, 0);
  let year = date.getFullYear();
  let dayNum = date.getDay();
  let dayname;
  switch (dayNum) {
    case 0:
      dayname = "Sunday";
      break;

    case 1:
      dayname = "Monday";
      break;

    case 2:
      dayname = "Tuesday";
      break;

    case 3:
      dayname = "Wednesday";
      break;

    case 4:
      dayname = "Thursday";
      break;

    case 5:
      dayname = "Friday";
      break;

    case 6:
      dayname = "Saturday";
      break;
  }

  return [`${day}/${month}/${year}`, dayname];
}
// function showErr() {
//   document.getElementById("showWeather").innerHTML = null;
//   let div = document.createElement("div");

//   let imgGif = document.createElement("img");
//   imgGif.src = "https://i.giphy.com/media/3orieUe6ejxSFxYCXe/giphy.webp";

//   let p = document.createElement("p");
//   p.innerText = "Sorry, We did not found that location";
//   p.style.textAlign = "center";

//   div.append(imgGif, p);

//   let result = document.getElementById("showWeather");
//   result.style.display = "flex";
//   result.style.justifyContent = "center";
//   result.append(div);
// }
