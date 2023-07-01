'use strict';
const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldReat = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

// 초기값
let started = false;
let timer = undefined;
let score = 0;

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
  playSound(bgSound);
}

function stopGame() {
  stopGameTimer();
  hideGameBtn();
  showPopUpWithText('REPLAY❓');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameBtn();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? 'YOU WON 🎊' : 'YOU LOST 🔥');
}

// 버튼 play, stop 바꾸기

function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  showGameBtn();
}

// 정지 시 버튼 숨기기.
function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function showGameBtn() {
  gameBtn.style.visibility = 'visible';
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

// 타이머 플레이, 정지.
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(carrotCount === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

// 팝업창 보이기
function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

// 리플레이
popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
  showGameBtn();
});

// 버튼 누르면 해당 당근 삭제.
field.addEventListener('click', onFieldClick);

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === carrotCount) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    finishGame(false);
  }
}

// 사운드
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = carrotCount - score;
}

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
