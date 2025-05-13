// .env에 저장된 Open Weather API KEY
const openWeatherApiKey = import.meta.env.VITE_API_KEY;

// type1 weather-widget 가져오기
const weather_widget1_arr = document.querySelectorAll('.weather-widget1');

// weatherInfo 인터페이스 정의
interface weatherInfo {
  temperature: number;
  weather_location_en: string;
  weather_status: number;
}

// 날씨 상태를 나타내는 배열
const weather_status_list = [
  ['Empty', 'Empty'],
  ['맑음', 'clear'],
  ['조금 흐림', 'partly_cloudy'],
  ['흐림', 'cloudy'],
  ['바람', 'windy'],
  ['비', 'rain'],
  ['눈', 'snow'],
];

// weather widget1 초기 세팅하는 함수
function initWeatherWidget() {
  // 사용자 위치 가져오는 함수 호출
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    // 위치 기반으로 날씨 정보를 가져오는 함수 호출
    getWeatherInfo(lat, lon).then(weather_info => {
      // 날씨 정보를 토대로 위젯에 보여주는 함수 호출
      showWeather1(weather_info);
    });
  });
}

// 위치 기반으로 날씨 정보를 가져오는 함수
async function getWeatherInfo(lat: number, lon: number) {
  const lati = lat;
  const long = lon;

  // Open Weather API
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&lang=kr&appid=${openWeatherApiKey}&units=metric`);
  const rst = await res.json();

  // 기온을 가져오는 변수
  const temperature = rst.main.temp;

  // 지역을 가져오는 변수
  const weather_location_en = rst.name;

  // 날씨 상태를 가져오는 변수
  let weather_status: number = 0;

  /**
   * https://openweathermap.org/weather-conditions의 표현 방법을 토대로 구현한 조건문
   * weather[0].id===3xx : 비
   * weather[0].id===5xx : 비
   * weather[0].id===6xx : 눈
   * wind.speed>=14 : 바람
   * weather[0].id===800 : 맑음
   * weather[0].id===801 : 조금 흐림
   * weather[0].id===802 : 조금 흐림
   * weather[0].id===803 : 흐림
   * weather[0].id===804 : 흐림
   * ----아래는 추가고려
   * weather[0].id===2xx : 번개
   * weather[0].id===7xx : 기후(안개 먼지 등)
   */
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

  // 객체를 weatherInfo 인터페이스를 이용하여 반환
  const result: weatherInfo = { temperature, weather_location_en, weather_status };
  return result;
}
// 날씨 정보를 토대로 위젯에 보여주는 함수
function showWeather1(weather_info: weatherInfo) {
  Array.from(weather_widget1_arr).forEach(e => {
    // weather-widget1에 있는 요소 가져오기
    const weather_status = e.querySelector('.weather-status');
    const weather_status_img = e.querySelector('.weather-status-img') as HTMLImageElement;
    const temperature = e.querySelector('.temperature');
    const weather_location_en = e.querySelector('.weather-location-en');

    // 각 요소에 맞는 정보 대입
    temperature!.textContent = Math.trunc(weather_info.temperature).toString();
    weather_location_en!.textContent = weather_info.weather_location_en;
    const status = weather_info.weather_status;
    weather_status!.textContent = weather_status_list[status][0];
    weather_status_img!.src = `/public/asserts/weather-widget/${weather_status_list[status][1]}.svg`;
  });
}

// weather widget 초기 세팅하는 함수
initWeatherWidget();

// type2 weather-widget을 구현하기 위한 코드 임시 주석처리
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
