const maleNames = ['三平', '源兵衛', '甚兵衛', '与助', '勘左衛門', '太郎', '次郎', '小次郎', '楠末', '蘭丸', '吉平'];
const femaleNames = ['さと', 'さよ', 'きく', 'りん', 'らん', 'きよ', 'はる', 'ゆうこ', 'ゆり', 'ぼたん', 'はな'];
const races = ['人間'];

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateInitialVillagers(count) {
  const villagers = [];
  for (let i = 0; i < count; i++) {
    const gender = Math.random() < 0.5 ? '男' : '女';
    const name = randFrom(gender === '男' ? maleNames : femaleNames);
    const race = randFrom(races);
    const age = randRange(16, 60);
    const hp = 100;
    const mental = 100;
    const happiness = 50;

    let str = randRange(10, 30);
    let end = randRange(10, 30);
    let dex = randRange(5, 15);
    let mgc = randRange(10, 30);
    let chm = gender === '男' ? randRange(5, 20) : randRange(15, 30);
    let int = randRange(10, 30);
    let dil = randRange(10, 30);
    let eth = randRange(10, 30);
    let crg = randRange(10, 30);
    let lov = randRange(10, 30);

    const bodyTrait = '健康的';
    const mindTrait = '普通';

    villagers.push({ name, gender, race, age, hp, mental, happiness, str, end, dex, mgc, chm, int, dil, eth, crg, lov, bodyTrait, mindTrait });
  }
  return villagers;
}

function getDateString(year, month) {
  const seasons = ['春', '春', '春', '春', '夏', '夏', '夏', '夏', '秋', '秋', '冬', '冬'];
  return `${year}年${month}月（${seasons[month - 1]}）`;
}

export { generateInitialVillagers, getDateString };
