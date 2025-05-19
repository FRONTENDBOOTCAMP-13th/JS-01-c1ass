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
  pid: 'arrow',
  imageURL: '/asserts/mac/arrow.png',
  fileURL: '#void', // 수정
};
programIDSet.add(doodi.pid);
programIDSet.add(card.pid);
programIDSet.add(arrow.pid);
programIDSet.add(card.pid);
programID.push(doodi);
programID.push(card);
programID.push(arrow);
programID.push(card);
export { programIDSet, programID };
