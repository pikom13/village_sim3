import { generateInitialVillagers, getDateString } from './villager.js';

let year = 1000;
let month = 4;

const jobList = ['なし', '農作業', '伐採'];
const actionList = ['休養', '余暇', '農作業', '伐採'];

// 村人データ初期化
const baseVillagers = generateInitialVillagers(6);
const villagers = baseVillagers.map(v => {
  return {
    ...v,
    jobData: {
      job: 'なし',
      action: '休養'
    }
  };
});

function advanceMonth() {
  month++;
  if (month > 12) {
    month = 1;
    year++;
  }
  render();
}

function render() {
  const table = document.getElementById('villagerTable');
  const dateDisplay = document.getElementById('dateDisplay');
  if (!table || !dateDisplay) return;

  dateDisplay.textContent = `${getDateString(year, month)}`;
  table.innerHTML = '';

  const header = `
    <tr>
      <th>名前</th><th>性別</th><th>年齢</th><th>種族</th>
      <th>体力</th><th>メンタル</th><th>幸福</th>
      <th>筋力</th><th>耐久</th><th>器用</th><th>魔力</th><th>魅力</th><th>肉体特性</th>
      <th>知力</th><th>勤勉</th><th>倫理</th><th>勇気</th><th>好色</th><th>精神特性</th>
      <th>職業</th><th>行動</th>
    </tr>
  `;
  table.insertAdjacentHTML('beforeend', header);

  villagers.forEach((v, i) => {
    const row = document.createElement('tr');

    // 基本情報 + 能力値
    row.innerHTML = `
      <td>${v.name}</td>
      <td>${v.gender}</td>
      <td>${v.age}</td>
      <td>${v.race}</td>
      <td>${v.hp}</td>
      <td>${v.mental}</td>
      <td>${v.happiness}</td>
      <td>${v.str}</td>
      <td>${v.end}</td>
      <td>${v.dex}</td>
      <td>${v.mgc}</td>
      <td>${v.chm}</td>
      <td>${v.bodyTrait}</td>
      <td>${v.int}</td>
      <td>${v.dil}</td>
      <td>${v.eth}</td>
      <td>${v.crg}</td>
      <td>${v.lov}</td>
      <td>${v.mindTrait}</td>
    `;

    // 職業 select
    const jobSelect = document.createElement('select');
    jobList.forEach(job => {
      const opt = document.createElement('option');
      opt.value = job;
      opt.textContent = job;
      if (v.jobData.job === job) opt.selected = true;
      jobSelect.appendChild(opt);
    });
    jobSelect.onchange = () => {
      v.jobData.job = jobSelect.value;
      v.jobData.action = jobSelect.value; // 同名行動に変更
      render();
    };
    const jobCell = document.createElement('td');
    jobCell.appendChild(jobSelect);
    row.appendChild(jobCell);

    // 行動 select
    const actionSelect = document.createElement('select');
    actionList.forEach(action => {
      const opt = document.createElement('option');
      opt.value = action;
      opt.textContent = action;
      if (v.jobData.action === action) opt.selected = true;
      actionSelect.appendChild(opt);
    });
    actionSelect.onchange = () => {
      v.jobData.action = actionSelect.value;
    };
    const actionCell = document.createElement('td');
    actionCell.appendChild(actionSelect);
    row.appendChild(actionCell);

    table.appendChild(row);
  });
}

render();
console.log(villagers);
window.advanceMonth = advanceMonth;
