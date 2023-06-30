'use strict';
const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;
const GAME_DURATION_SEC = 65;

const field = document.querySelector('.game__field');
const fieldReat = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gamePopUp = document.querySelector('.pop-up');

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
  startGameTimer();
}

function stopGame() {
  stopGameTimer();
  PopUpToggle();
}

// 버튼 play, stop 바꾸기

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

// function removeTimerAndScore() {
//   gameTimer.style.visibility = 'hidden';
//   gameScore.style.visibility = 'hidden';
// }

// 타이머 플레이,
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function stopGameTimer() {
  clearInterval(timer);
}

// 일시정지, 팝업창 나오기.
function PopUpToggle() {
  gamePopUp.classList.toggle('pop-up--hide');
  gameBtn.classList.toggle('game__button--hide');
}

// 버튼 누르면 해당 당근 삭제.
field.addEventListener('click', (event) => {
  const carrotId = event.target.dataset.id;
  if (carrotId) {
    const carrotDeleted = document.querySelector(
      `.carrot[data-id='${carrotId}']`
    );
    carrotDeleted.remove();
  }
});

// 아이템 생성.
function inItGame() {
  field.innerHTML = '';
  gameScore.innerText = carrotCount;
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
