function arrShuffle(arr) {
  let shuffled = arr.slice();
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shuffled[i];


    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

let timerInterval = null;

function startTimer(seconds, onTick, onEnd) {
  let timeLeft = seconds;
  onTick(timeLeft, seconds);

  timerInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft < 0) timeLeft = 0;
    onTick(timeLeft, seconds);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      onEnd();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
