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
      <th>職業</th><th>行動</th>
    </tr>`;
  table.insertAdjacentHTML('beforeend', header);

  villagers.forEach((villager, index) => {
    const row = document.createElement('tr');

    // 村人情報セル
    row.innerHTML = `
      <td>${villager.name}</td>
      <td>${villager.gender}</td>
      <td>${villager.age}</td>
      <td>${villager.race}</td>
    `;

    // 職業 select
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
      villager.jobData.action = jobSelect.value; // 同じ名前の行動に更新
      render(); // 再描画してactionセレクトも更新
    };

    // 行動 select
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
      // 職業には影響なし
    };

    // セルに追加
    const jobCell = document.createElement('td');
    jobCell.appendChild(jobSelect);
    row.appendChild(jobCell);

    const actionCell = document.createElement('td');
    actionCell.appendChild(actionSelect);
    row.appendChild(actionCell);

    table.appendChild(row);
  });
}

render();
window.advanceMonth = advanceMonth;
