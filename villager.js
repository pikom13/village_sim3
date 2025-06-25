// villager.js

const maleNames = ['三平', '源兵衛', '甚兵衛', '与助', '勘左衛門', '太郎', '次郎', '小次郎', '楠末', '蘭丸', '吉平'];
const femaleNames = ['さと', 'さよ', 'きく', 'りん', 'らん', 'きよ', 'はる', 'ゆうこ', 'ゆり', 'ぼたん', 'はな'];
const races = ['人間'];

const maleBodyTraits = {
  '健康的': { all: 3 },
  '小太り': { str: 3, chm: -3 },
  '肥満': { chm: -5 },
  '巨漢': { str: 8 },
  '悪人顔': { chm: -5 },
  '長身': { chm: 3 },
  'がっしり': { str: 5 },
  '筋肉質': { str: 12 },
  'スマート': { chm: 8 },
  '地味': { chm: -3 },
  '美形': { chm: 10 },
  '中肉中背': {},
  '巨躯': { str: 8 },
};

const femaleBodyTraits = {
  '健康的': { all: 3 },
  '華奢': { chm: 5, str: -5 },
  'ミステリアス': { chm: 4, mgc: 3 },
  '長身': {},
  'スタイル抜群': { chm: 5 },
  'クール': { dex: 3, chm: 2 },
  'スレンダー': { dex: 3, str: -5 },
  '豊満': { chm: 5, end: 2, mgc: 2 },
  '絶世の美女': { chm: 10 },
  'しなやか': { str: 3, end: 3, dex: 2 },
  '癒し系': { chm: 5, mgc: 5 },
};

const mindTraits = {
  '普通': {},
  '卑屈': { dil: -3, lov: 3 },
  '好奇心旺盛': { crg: 3 },
  '活発': { dil: 3 },
  '知性派': { int: 5 },
  '根暗': { eth: 3, int: 3 },
  '堅物': { lov: -3 },
  '怠け者': { dil: -3, eth: -3, lov: 5 },
  '働き者': { dil: 5 },
  '善人': { eth: 5 },
  '無鉄砲': { crg: 5 },
  'ろくでなし': { eth: -6, lov: 5 },
  '浮気性': { lov: 10 },
  '草食系': { dil: 3, lov: -3 },
  '男勝り': { crg: 5 },
  '本の虫': { int: 5 },
  '綺麗好き': { dil: 8 },
  '肉食系': { lov: 5 },
};

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
    let hp = 100, mental = 100, happiness = 50;
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

    const bodyTraitList = gender === '男' ? Object.keys(maleBodyTraits) : Object.keys(femaleBodyTraits);
    const bodyTrait = randFrom(bodyTraitList);
    const mindTrait = randFrom(Object.keys(mindTraits));
    const bodyEffect = gender === '男' ? maleBodyTraits[bodyTrait] : femaleBodyTraits[bodyTrait];
    const mindEffect = mindTraits[mindTrait];

    for (let [k, v] of Object.entries(bodyEffect)) {
      if (k === 'all') {
        str += v;
        end += v;
        dex += v;
        mgc += v;
        chm += v;
      } else {
        if (k === 'str') str += v;
        if (k === 'end') end += v;
        if (k === 'dex') dex += v;
        if (k === 'mgc') mgc += v;
        if (k === 'chm') chm += v;
      }
    }

    for (let [k, v] of Object.entries(mindEffect)) {
      if (k === 'int') int += v;
      if (k === 'dil') dil += v;
      if (k === 'eth') eth += v;
      if (k === 'crg') crg += v;
      if (k === 'lov') lov += v;
    }

    villagers.push({ name, gender, race, age, hp, mental, happiness, str, end, dex, mgc, chm, int, dil, eth, crg, lov, bodyTrait, mindTrait });
  }
  return villagers;
}

function getDateString(year, month) {
  const seasons = ['春', '春', '春', '春', '夏', '夏', '夏', '夏', '秋', '秋', '冬', '冬'];
  return `${year}年${month}月（${seasons[month - 1]}）`;
}

export { generateInitialVillagers, getDateString };
