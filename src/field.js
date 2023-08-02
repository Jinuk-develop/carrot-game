'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

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
    this.fieldReat = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    //아이템 생성한 뒤 field에 추가
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // Underbar - privata 한 함수( 외부에서 불러오기 x)
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldReat.width - CARROT_SIZE;
    const y2 = this.fieldReat.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
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
}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
