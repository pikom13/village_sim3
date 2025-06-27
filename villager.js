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
  const maleBodyTraits = {
  '健康的': { all: 100 },
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
  '巨躯': { str: 8 }
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
  '癒し系': { chm: 5, mgc: 5 }
};

    const maleMindTraits = {
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
};

    const femaleMindTraits = {
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
  '男勝り': { crg: 5 },
  '本の虫': { int: 5 },
  '綺麗好き': { dil: 8 },
  '肉食系': { lov: 5 }
};

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

        const bodyTraitList = gender === '男' ? Object.keys(maleBodyTraits) : Object.keys(femaleBodyTraits);
    const bodyTrait = randFrom(bodyTraitList);

    const mindTraitList = gender === '男' ? Object.keys(maleMindTraits) : Object.keys(femaleMindTraits); 
    const mindTrait = randFrom(mindTraitList);

    const bodyEffects = gender === '男' ? maleBodyTraits[bodyTrait] : femaleBodyTraits[bodyTrait];
    const mindEffects = gender === '男' ? maleMindTraits[mindTrait] : femaleMineTraits[mindTrait];

// 肉体特性補正
    for (const key in bodyEffects) {
      const value = bodyEffects[key];
      if (key === 'all') {
        str += value; end += value; dex += value; mgc += value; chm += value;
      } else if (key === 'str') str += value;
      else if (key === 'end') end += value;
      else if (key === 'dex') dex += value;
      else if (key === 'mgc') mgc += value;
      else if (key === 'chm') chm += value;
    }

    // 精神特性補正
    for (const key in mindEffects) {
      const value = mindEffects[key];
      if (key === 'int') int += value;
      else if (key === 'dil') dil += value;
      else if (key === 'eth') eth += value;
      else if (key === 'crg') crg += value;
      else if (key === 'lov') lov += value;
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
