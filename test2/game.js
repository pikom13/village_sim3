// game.js

import { generateInitialVillagers, getDateString } from './villager.js';

let currentMonth = 4;
let currentYear = 1000;
let villagers = generateInitialVillagers(6);

function advanceMonth() {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  updateDateDisplay();
  renderVillagers();
}

function updateDateDisplay() {
  document.getElementById('dateDisplay').textContent = `現在：${getDateString(currentYear, currentMonth)}`;
}

function renderVillagers() {
  const table = document.getElementById('villagerTable');
  table.innerHTML = '';
  const headerRow = document.createElement('tr');
  const headers = ['名前', '性別', '年齢', '種族', '体力', 'メンタル', '幸福', '筋力', '耐久', '器用', '魔力', '魅力', '知力', '勤勉', '倫理', '勇気', '好色', '肉体特性', '精神特性'];
  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  villagers.forEach(v => {
    const row = document.createElement('tr');
    const values = [v.name, v.gender, v.age, v.race, v.hp, v.mental, v.happiness, v.str, v.end, v.dex, v.mgc, v.chm,
      v.int, v.dil, v.eth, v.crg, v.lov, v.bodyTrait, v.mindTrait];
    values.forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      row.appendChild(td);
    });
    table.appendChild(row);
  });
}

window.advanceMonth = advanceMonth;

updateDateDisplay();
renderVillagers();
