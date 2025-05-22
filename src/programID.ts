const programIDSet = new Set();
const programID: Array<program> = new Array<program>();
const widgetIDSet = new Set();
const widgetID: Array<widget> = new Array<widget>();
const settingIDSet = new Set();
const settingID: Array<setting> = new Array<setting>();
interface program {
  pid: string;
  imageURL?: string;
  fileURL: string;
}
interface widget {
  wid: string;
}
interface setting {
  sid: string;
}
const doodi: program = {
  pid: 'doodi',
  imageURL: '/asserts/mac/doodi.png',
  fileURL: '/src/pages/doodi-all.html',
};
const card: program = {
  pid: 'card',
  imageURL: '/asserts/mac/card.png',
  fileURL: '/src/pages/card.html',
};
const arrow: program = {
  pid: 'arrow-dodge',
  imageURL: '/asserts/mac/arrow-dodge.png',
  fileURL: '/src/pages/arrow-dodge-game.html',
};
const socks: program = {
  pid: 'sockast',
  imageURL: '/asserts/mac/socks.png',
  fileURL: '/src/pages/socks-game.html',
};
programID.push(doodi);
programID.push(card);
programID.push(arrow);
programID.push(socks);
programID.forEach(e => {
  programIDSet.add(e.pid);
});

const clock: widget = {
  wid: 'clock-widget',
};
const weather: widget = {
  wid: 'weather-widget',
};
const memo: widget = {
  wid: 'memo-widget',
};
const memo1: widget = {
  wid: 'memo-widget1',
};
const memo2: widget = {
  wid: 'memo-widget2',
};
const memo3: widget = {
  wid: 'memo-widget3',
};
const calendar: widget = {
  wid: 'calendar-widget',
};
widgetID.push(clock);
widgetID.push(weather);
widgetID.push(memo);
widgetID.push(memo1);
widgetID.push(memo2);
widgetID.push(memo3);
widgetID.push(calendar);
widgetID.forEach(e => {
  widgetIDSet.add(e.wid);
});

const addIcon: setting = {
  sid: 'add-icon',
};
settingID.push(addIcon);
settingID.forEach(e => {
  settingIDSet.add(e.sid);
});

export { programIDSet, programID, widgetIDSet, widgetID, settingIDSet, settingID, type program };
