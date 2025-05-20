// clock-widget 요소
// const clock_widget_arr = document.querySelectorAll('.clock-widget-component');

// clock-widget의 시침, 분침, 초침 요소를 담을 배열
// const hour_niddle_arr: Array<HTMLElement> = [];
// const minute_niddle_arr: Array<HTMLElement> = [];
// const second_niddle_arr: Array<HTMLElement> = [];

// clock-widget의 시침, 분침, 초침 요소를 push
// Array.from(clock_widget_arr).forEach(element => {
//   hour_niddle_arr.push(element.querySelector('.hour-niddle-div') as HTMLElement);
//   minute_niddle_arr.push(element.querySelector('.minute-niddle-div') as HTMLElement);
//   second_niddle_arr.push(element.querySelector('.second-niddle-div') as HTMLElement);
// });

// rotateNiddle 초기 호출
rotateNiddle();

// 그 후 1초마다 반복 호출
setInterval(rotateNiddle, 1000);

// 바늘 돌리는 함수
function rotateNiddle() {
  const crt_date = new Date(); // 현재 시간 가져오기
  const time: number[] = parseTime(crt_date); // 시, 분, 초 담는 배열
  rotateHourNiddle(time[0]);
  rotateMinuteNiddle(time[1]);
  rotateSecondNiddle(time[2]);
}

// 시침 돌리는 함수
function rotateHourNiddle(time: number): void {
  const clock_widget_arr = document.querySelectorAll('.clock-widget-component');
  const hour_niddle_arr: Array<HTMLElement> = [];
  Array.from(clock_widget_arr).forEach(element => {
    hour_niddle_arr.push(element.querySelector('.hour-niddle-div') as HTMLElement);
  });
  Array.from(hour_niddle_arr).forEach(element => {
    element!.style.rotate = (time / 120).toString() + 'deg';
  });
}

// 분침 돌리는 함수
function rotateMinuteNiddle(time: number): void {
  const clock_widget_arr = document.querySelectorAll('.clock-widget-component');
  const minute_niddle_arr: Array<HTMLElement> = [];
  Array.from(clock_widget_arr).forEach(element => {
    minute_niddle_arr.push(element.querySelector('.minute-niddle-div') as HTMLElement);
  });
  Array.from(minute_niddle_arr).forEach(element => {
    element!.style.rotate = (time / 10).toString() + 'deg';
  });
}

// 초침 돌리는 함수
function rotateSecondNiddle(time: number): void {
  const clock_widget_arr = document.querySelectorAll('.clock-widget-component');
  const second_niddle_arr: Array<HTMLElement> = [];
  Array.from(clock_widget_arr).forEach(element => {
    second_niddle_arr.push(element.querySelector('.second-niddle-div') as HTMLElement);
  });
  Array.from(second_niddle_arr).forEach(element => {
    element!.style.rotate = (time * 6).toString() + 'deg';
  });
}

// 현재 시, 분, 초를 초로 변환하는 함수
function parseTime(date: Date) {
  const secondforsecond = date.getSeconds();
  const secondforminute = secondforsecond + date.getMinutes() * 60;
  const secondforhour = secondforminute + (date.getHours() % 12) * 3600;
  return [secondforhour, secondforminute, secondforsecond];
}
