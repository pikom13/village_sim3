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
    const bodyTrait = randFrom(gender === '男' ? maleBodyTraits : femaleBodyTraits);
    const mindTrait = randFrom(gender === '男' ? maleMindTraits : femaleMindTraits);

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

    const maleBodyTraits = ['健康的', '小太り', '肥満', '巨漢', '悪人顔', '長身', 'がっしり', '筋肉質', 'スマート', '地味', '美形', '中肉中背', '巨躯'];
    const femaleBodyTraits = ['健康的', '華奢', 'ミステリアス', '長身', 'スタイル抜群', 'クール', 'スレンダー', '豊満', '絶世の美女', 'しなやか', '癒し系'];

    const maleMindTraits = ['普通', '卑屈', '好奇心旺盛', '活発', '知性派', '根暗', '堅物', '怠け者', '働き者', '善人', '無鉄砲', 'ろくでなし', '浮気性', '草食系'];
    const femaleMindTraits = ['普通', '卑屈', '好奇心旺盛', '活発', '知性派', '根暗', '堅物', '怠け者', '働き者', '善人', '男勝り', '本の虫', '綺麗好き', '肉食系'];


    villagers.push({ name, gender, race, age, hp, mental, happiness, str, end, dex, mgc, chm, int, dil, eth, crg, lov, bodyTrait, mindTrait });
  }
  return villagers;
}

function getDateString(year, month) {
  const seasons = ['春', '春', '春', '春', '夏', '夏', '夏', '夏', '秋', '秋', '冬', '冬'];
  return `${year}年${month}月（${seasons[month - 1]}）`;
}

export { generateInitialVillagers, getDateString };
