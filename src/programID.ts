const programIDSet = new Set();
const programID: Array<program> = new Array<program>();
interface program {
  pid: string;
  imageURL: string;
  fileURL: string;
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

export { programIDSet, programID };
