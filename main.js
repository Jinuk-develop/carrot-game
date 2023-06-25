'use strict';
const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;

const field = document.querySelector('.game__field');
const fieldReat = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

// 초기값
let started = false;
let timer = undefined;
let scorer = 0;

let id = new Date().getTime();

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});
// 게임 시작, 정지.
function startGame() {
  inItGame();
  showStopBtn();
  showTimerAndScore();
}

function stopGame() {
  showPlayBtn();
  removeTimerAndScore();
}

// 버튼 play, stop 바꾸기
function showPlayBtn() {
  const icon = gameBtn.querySelector('.fa-stop');
  icon.classList.remove('fa-stop');
  icon.classList.add('fa-play');
}

function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

// 타이머, 스코어 껐다, 키기
function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function removeTimerAndScore() {
  gameTimer.style.visibility = 'hidden';
  gameScore.style.visibility = 'hidden';
}

// 버튼 누르면 해당 당근 삭제.
field.addEventListener('click', (event) => {
  ev;
});

// 아이템 생성.
function inItGame() {
  field.innerHTML = '';
  //아이템 생성한 뒤 field에 추가
  addItem('carrot', carrotCount, 'img/carrot.png');
  addItem('bug', bugCount, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldReat.width - carrotSize;
  const y2 = fieldReat.height - carrotSize;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('data-id', id + Math.random());
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
