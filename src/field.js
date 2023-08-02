'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;
const MOVE_DURATION = 500;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});
export class Field {
  constructor(carrotCount, bugCount, getGameStatus) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.getGameStatus = getGameStatus;

    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);

    this.x2 = this.fieldRect.width - CARROT_SIZE;
    this.y2 = this.fieldRect.height - CARROT_SIZE;
    this.x = 0;
    this.y = 0;
    this.timer = undefined;
  }

  init() {
    this.field.innerHTML = '';
    //아이템 생성한 뒤 field에 추가
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
    this.move();
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }
  onClick = (event) => {
    const target = event.target;
    if (!this.getGameStatus()) {
      return;
    }
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };

  // Underbar - privata 한 함수( 외부에서 불러오기 x)
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, this.x2);
      const y = randomNumber(y1, this.y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      this.field.appendChild(item);
    }
  }

  move() {
    const bugs = document.querySelectorAll('.bug');

    this.timer = setInterval(() => {
      bugs.forEach((bug) => {
        const x = randomNumber(-50, 50);
        const y = randomNumber(-50, 50);

        bug.style.transition = 'all 2000ms ease';

        let newX = parseFloat(bug.style.left);
        newX += x;
        // field범위넘어가면안됨.
        if (newX > 0 && newX < this.x2) {
          bug.style.left = `${newX}px`;
        }

        let newY = parseFloat(bug.style.top);
        newY += y;
        // field범위넘어가면안됨.
        if (newY > 0 && newY < this.y2) {
          bug.style.top = `${newY}px`;
        }
      });
    }, MOVE_DURATION);
  }

  moveStop() {
    clearInterval(this.timer);
  }
}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
