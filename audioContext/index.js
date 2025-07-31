let audio = new AudioPlayer();

let btns = document.querySelector('.btns');
let state = document.querySelector('#state');

const TOTAL_KEYS = 22;

for (let i = 2; i < TOTAL_KEYS; i++) {
  let btn = document.createElement('button');
  btn.classList.add('btn');
  btn.textContent = `${i-1}`;
  btns.appendChild(btn);
  
  let playFunc = async () => {
    let allbtns = document.querySelectorAll('.btn');
    allbtns.forEach(b => b.classList.remove('active'));
    state.innerHTML = audio.audio.state;
    await audio.play(i*100, i);
    // console.log(c,i)
    btn.classList.add('active');
  };

  btn.onmousedown = playFunc;
}

function playAll() {
  audio.playAll(TOTAL_KEYS);
}


function typeSelect() {
  let type = document.querySelector('#typeSelector').value;
  // audio.setFrequencyType(type);
  audio.frequencyType = type;
}
