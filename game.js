import { generateInitialVillagers, getDateString } from './villager.js';

let year = 1000;
let month = 4;

const jobList = ['なし', '農作業', '伐採'];
const actionList = ['休養', '余暇', '農作業', '伐採'];

const villagers = generateInitialVillagers(6).map(v => ({
  ...v,
  jobData: {
    job: 'なし',
    action: '休養'
  }
}));

function advanceMonth() {
  month++;
  if (month > 12) {
    month = 1;
    year++;
  }
  render();
}

function render() {
  document.getElementById('dateDisplay').textContent = `${getDateString(year, month)}`;

  const table = document.getElementById('villagerTable');
  table.innerHTML = '';

  // ヘッダー
  let header = `
    <tr>
      <th>名前</th><th>性別</th><th>年齢</th><th>種族</th>
      <th>筋力</th><th>耐久</th><th>器用</th><th>魔力</th><th>魅力</th><th>肉体特性</th>
      <th>知力</th><th>勤勉</th><th>倫理</th><th>勇気</th><th>好色</th><th>精神特性</th>
      <th>職業</th><th>行動</th>
    </tr>`;
  table.insertAdjacentHTML('beforeend', header);

  villagers.forEach((villager, index) => {
    const row = document.createElement('tr');

    // 基本情報 + 能力値
    row.innerHTML = `
      <td>${villager.name}</td>
      <td>${villager.gender}</td>
      <td>${villager.age}</td>
      <td>${villager.race}</td>

      <td>${villager.body.str}</td>
      <td>${villager.body.end}</td>
      <td>${villager.body.dex}</td>
      <td>${villager.body.mag}</td>
      <td>${villager.body.chr}</td>
      <td>${villager.body.trait}</td>

      <td>${villager.mind.int}</td>
      <td>${villager.mind.diligence}</td>
      <td>${villager.mind.ethics}</td>
      <td>${villager.mind.courage}</td>
      <td>${villager.mind.lust}</td>
      <td>${villager.mind.trait}</td>
    `;

    // 職業セレクト
    const jobSelect = document.createElement('select');
    jobList.forEach(j => {
      const option = document.createElement('option');
      option.value = j;
      option.textContent = j;
      if (villager.jobData.job === j) option.selected = true;
      jobSelect.appendChild(option);
    });
    jobSelect.onchange = () => {
      villager.jobData.job = jobSelect.value;
      villager.jobData.action = jobSelect.value; // 行動も更新
      render(); // 再描画して反映
    };
    const jobCell = document.createElement('td');
    jobCell.appendChild(jobSelect);
    row.appendChild(jobCell);

    // 行動セレクト
    const actionSelect = document.createElement('select');
    actionList.forEach(a => {
      const option = document.createElement('option');
      option.value = a;
      option.textContent = a;
      if (villager.jobData.action === a) option.selected = true;
      actionSelect.appendChild(option);
    });
    actionSelect.onchange = () => {
      villager.jobData.action = actionSelect.value;
      // 職業には影響を与えない
    };
    const actionCell = document.createElement('td');
    actionCell.appendChild(actionSelect);
    row.appendChild(actionCell);

    table.appendChild(row);
  });
}

render();
window.advanceMonth = advanceMonth;
