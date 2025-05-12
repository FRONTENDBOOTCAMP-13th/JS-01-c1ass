const clock_widget_arr = document.querySelectorAll('.clock-widget-component');
const hour_niddle_arr: Array<HTMLElement> = [];
const minute_niddle_arr: Array<HTMLElement> = [];
const second_niddle_arr: Array<HTMLElement> = [];

Array.from(clock_widget_arr).forEach(element => {
  hour_niddle_arr.push(element.querySelector('.hour-niddle-div') as HTMLElement);
  minute_niddle_arr.push(element.querySelector('.minute-niddle-div') as HTMLElement);
  second_niddle_arr.push(element.querySelector('.second-niddle-div') as HTMLElement);
});
rotateNiddle();
setInterval(rotateNiddle, 1000);
function rotateNiddle() {
  const crt_date = new Date();
  const time = parseTime(crt_date);
  rotateHourNiddle(time[0]);
  rotateMinuteNiddle(time[1]);
  rotateSecondNiddle(time[2]);
}
function rotateHourNiddle(time: number): void {
  Array.from(hour_niddle_arr).forEach(element => {
    element!.style.rotate = (time / 120).toString() + 'deg';
  });
}
function rotateMinuteNiddle(time: number): void {
  Array.from(minute_niddle_arr).forEach(element => {
    element!.style.rotate = (time / 10).toString() + 'deg';
  });
}
function rotateSecondNiddle(time: number): void {
  Array.from(second_niddle_arr).forEach(element => {
    element!.style.rotate = (time * 6).toString() + 'deg';
  });
}

function parseTime(date: Date) {
  const secondforsecond = date.getSeconds();
  const secondforminute = secondforsecond + date.getMinutes() * 60;
  const secondforhour = secondforminute + (date.getHours() % 12) * 3600;
  return [secondforhour, secondforminute, secondforsecond];
}
