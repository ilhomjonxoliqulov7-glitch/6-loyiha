// ================== STATE ==================
let running = false;
let elapsed = 0;
let timerId = null;
let lastLap = 0;
let lapCount = 0;

// ================== DOM ==================
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsEl = document.getElementById('laps');

// ================== HELPERS ==================
function formatMs(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
}

function updateDisplay() {
  timeEl.textContent = formatMs(elapsed);
}

// ================== ACTIONS ==================
function toggle() {
  if (running) {
    clearInterval(timerId);
    startBtn.textContent = '▶ Davom';
    startBtn.classList.add('paused');
    lapBtn.disabled = true;
  } else {
    const startTime = Date.now() - elapsed;
    timerId = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startBtn.textContent = '⏸ Pauza';
    startBtn.classList.remove('paused');
    lapBtn.disabled = false;
  }
  running = !running;
}

function addLap() {
  lapCount++;
  const lapTime = elapsed - lastLap;
  lastLap = elapsed;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>Lap ${lapCount}</span>
    <span>${formatMs(lapTime)}</span>
  `;
  lapsEl.prepend(li);
}

function reset() {
  clearInterval(timerId);
  running = false;
  elapsed = 0;
  lastLap = 0;
  lapCount = 0;
  lapsEl.innerHTML = '';
  startBtn.textContent = '▶ Boshlash';
  startBtn.classList.remove('paused');
  lapBtn.disabled = true;
  updateDisplay();
}

// ================== EVENTS ==================
startBtn.addEventListener('click', toggle);
lapBtn.addEventListener('click', addLap);
resetBtn.addEventListener('click', reset);

document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); toggle(); }
  if (e.key === 'l' || e.key === 'L') { if (!lapBtn.disabled) addLap(); }
  if (e.key === 'r' || e.key === 'R') reset();
});

// ================== INIT ==================
updateDisplay();