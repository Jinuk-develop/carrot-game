'use strict';
const carrotSize = 80;
const field = document.querySelector('.game__field');
const fieldReat = field.getBoundingClientRect();

function inGame() {
  //아이템 생성한 뒤 field에 추가
  console.log(fieldReat);
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldReat.width - carrotSize;
  const y2 = fieldReat.height - carrotSize;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

inGame();
