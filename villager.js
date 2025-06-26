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

  villagers.forEach((villager, index) => {
    const row = document.createElement('tr');

    // 基本 & 能力
    row.innerHTML = `
      <td>${villager.name}</td>
      <td>${villager.gender}</td>
      <td>${villager.age}</td>
      <td>${villager.race}</td>

      <td>${villager.hp}</td>
      <td>${villager.mental}</td>
      <td>${villager.happiness}</td>

      <td>${villager.str}</td>
      <td>${villager.end}</td>
      <td>${villager.dex}</td>
      <td>${villager.mgc}</td>
      <td>${villager.chm}</td>
      <td>${villager.bodyTrait}</td>

      <td>${villager.int}</td>
      <td>${villager.dil}</td>
      <td>${villager.eth}</td>
      <td>${villager.crg}</td>
      <td>${villager.lov}</td>
      <td>${villager.mindTrait}</td>
    `;

    // 職業セレクト
    const jobSelect = document.createElement('select');
    jobList.forEach(job => {
      const opt = document.createElement('option');
      opt.value = job;
      opt.textContent = job;
      if (villager.jobData.job === job) opt.selected = true;
      jobSelect.appendChild(opt);
    });
    jobSelect.onchange = () => {
      villager.jobData.job = jobSelect.value;
      villager.jobData.action = jobSelect.value; // 職業と同名の行動に更新
      render();
    };
    const jobCell = document.createElement('td');
    jobCell.appendChild(jobSelect);
    row.appendChild(jobCell);

    // 行動セレクト
    const actionSelect = document.createElement('select');
    actionList.forEach(action => {
      const opt = document.createElement('option');
      opt.value = action;
      opt.textContent = action;
      if (villager.jobData.action === action) opt.selected = true;
      actionSelect.appendChild(opt);
    });
    actionSelect.onchange = () => {
      villager.jobData.action = actionSelect.value;
    };
    const actionCell = document.createElement('td');
    actionCell.appendChild(actionSelect);
    row.appendChild(actionCell);

    table.appendChild(row);
  });
}

render();
window.advanceMonth = advanceMonth;
