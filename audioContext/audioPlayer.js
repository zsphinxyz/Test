class AudioPlayer {
  constructor() {
    this.delay = 200
    this.frequencyType = "sine";
    this.audio = new AudioContext();
    this.oscillator = null;
    this.gain = null;
  }
  
  initialize() {
    this.oscillator = this.audio.createOscillator();
    this.gain = this.audio.createGain();
    this.gain.gain.value = 0.3;
    this.oscillator.frequency.value = 900;
    this.oscillator.type = this.frequencyType;
    this.oscillator.connect(this.gain);
    this.gain.connect(this.audio.destination);
    this.oscillator.start();
  }
  
  async play(freq, current) {
    this.initialize();
    this.oscillator.frequency.value = freq;
    this.gain.gain.value = 0.3;
    this.gain.gain.exponentialRampToValueAtTime(0.00001, this.audio.currentTime + 1.5);
    return current;
  }

  async delayPause(ms=this.delay) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

  stop() {
    // this.oscillator.stop();
    // this.oscillator.disconnect();
    // this.oscillator.stop();
    // this.oscillator = null;
    // this.gain.disconnect();
    // this.gain.gain.value = 0;
    // this.gain = null;

    // this.initialize();
  }

  resume() {
    if (this.audio.state === "suspended") {
      this.audio.resume(); // Resumes from where it was paused
    }
  }

  async playAll(totalKeys) {
    let c = 2
    for (let i = 2; i < totalKeys; i++) {
      c = await this.play(i*100, i);
      await this.delayPause();
    }
  }

  playLaser() {
    this.initialize();
    this.oscillator.frequency.exponentialRampToValueAtTime(7000, this.audio.currentTime + 1.5);
    this.gain.gain.exponentialRampToValueAtTime(0.00001, this.audio.currentTime + 1.5);
  }


  async playBDSong() {
    // birthday song notes
    let song = [[2, 200], [2, 200], [3, 400], [2, 200], [5, 200], [4, 500],
                [2, 200], [2, 200], [3, 400], [2, 200], [6, 200], [5, 500],
                [2, 200], [2, 200], [2, 200], [8, 280], [6, 190], [5, 500],
                [3, 300], [3, 300], [4, 400], [2, 250], [2, 220], [7, 200], [5, 190], [3, 200], [3, 200]
              ];
    for (let i = 0; i < song.length; i++) {
      await this.play(song[i][0]*100, i[0]);
      await this.delayPause(song[i][1]);
    }
  }

  async playPi() {
    let PI = Math.PI.toString().replace('.', '').split('');
    for (let i = 0; i < PI.length; i++) {
      await this.play(Number(PI[i])*100, i);
      await this.delayPause(200);
      // console.log(PI[i])
    }
  }

}