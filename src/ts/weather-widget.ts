const openWeatherApiKey = import.meta.env.VITE_API_KEY;

const weather_widget_arr = document.querySelectorAll('.weather-widget1');

interface weatherInfo {
  temperature: number;
  weather_location_en: string;
  weather_status: number;
}

const weather_status_list = [
  ['Empty', 'Empty'],
  ['맑음', 'clear'],
  ['조금 흐림', 'partly_cloudy'],
  ['흐림', 'cloudy'],
  ['바람', 'windy'],
  ['비', 'rain'],
  ['눈', 'snow'],
];

function getCurrentLocationInfo() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    getWeatherInfo(lat, lon).then(weather_info => {
      showWeather1(weather_info);
    });
  });
}
async function getWeatherInfo(lat: number, lon: number) {
  const lati = lat;
  const long = lon;
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&lang=kr&appid=${openWeatherApiKey}&units=metric`);
  const rst = await res.json();
  const temperature = rst.main.temp;
  const weather_location_en = rst.name;
  let weather_status: number = 0;
  if (rst.weather[0].id.toString()[0] === '5') weather_status = 5;
  else if (rst.weather[0].id.toString()[0] === '3') weather_status = 3;
  else if (rst.weather[0].id.toString()[0] === '6') weather_status = 6;
  else if (rst.wind.speed >= 14) weather_status = 4;
  else if (rst.weather[0].id.toString()[0] === '8') {
    if (rst.weather[0].id.toString() === '800') weather_status = 1;
    else if (rst.weather[0].id.toString() === '801') weather_status = 2;
    else if (rst.weather[0].id.toString() === '802') weather_status = 2;
    else if (rst.weather[0].id.toString() === '803') weather_status = 3;
    else if (rst.weather[0].id.toString() === '804') weather_status = 3;
  }
  // console.log(rst.weather[0].id);
  // console.log(rst.wind.speed);
  // console.log(rst.main.temp);
  // console.log(rst.name);
  // console.log(rst);
  const result: weatherInfo = { temperature, weather_location_en, weather_status };
  return result;
}
function showWeather1(weather_info: weatherInfo) {
  Array.from(weather_widget_arr).forEach(e => {
    const weather_status = e.querySelector('.weather-status');
    const weather_status_img = e.querySelector('.weather-status-img') as HTMLImageElement;
    const temperature = e.querySelector('.temperature');
    const weather_location_en = e.querySelector('.weather-location-en');
    temperature!.textContent = Math.trunc(weather_info.temperature).toString();
    weather_location_en!.textContent = weather_info.weather_location_en;
    const status = weather_info.weather_status;
    weather_status!.textContent = weather_status_list[status][0];
    weather_status_img!.src = `/public/asserts/weather-widget/${weather_status_list[status][1]}.svg`;
  });
}
getCurrentLocationInfo();

// async function getWeatherInfo() {
//   // const res = await fetch(`https://apihub.kma.go.kr/api/typ01/cgi-bin/url/nph-dfs_shrt_grd?tmfc=2024051308&tmef=2024051311&vars=TMP&authKey=${apikey}`);
//   const start_time = '2024051308';
//   const end_time = '2024051311';
//   const res = await fetch(`https://apihub.kma.go.kr/api/typ01/cgi-bin/url/nph-dfs_shrt_grd?tmfc=${start_time}&tmef=${end_time}&vars=TMP&authKey=y0n8ChD3SfWJ_AoQ92n1mg`);
//   console.log(res);
// }
// getWeatherInfo();

// https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst?pageNo=1&numOfRows=1000&dataType=XML&base_date=20210628&base_time=0500&nx=55&ny=127&authKey=y0n8ChD3SfWJ_AoQ92n1mg
// async function getWeatherInfo() {
//   // const res = await fetch(`https://apihub.kma.go.kr/api/typ01/cgi-bin/url/nph-dfs_shrt_grd?tmfc=2024051308&tmef=2024051311&vars=TMP&authKey=${apikey}`);
//   // const start_time = '2024051308';
//   // const end_time = '2024051311';
//   const res = await fetch(`https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst?pageNo=1&numOfRows=1000&dataType=JSON&base_date=20210628&base_time=0500&nx=55&ny=127&authKey=y0n8ChD3SfWJ_AoQ92n1mg`);
//   console.log(res);
//   // const rst = await res.json();
//   // console.log(rst);
// }
// getWeatherInfo();
