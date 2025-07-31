const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const lambda = document.getElementById("lambda");
const ampl = document.getElementById("ampl");
const points = document.getElementById("points");

canvas.width = 400;
canvas.height = 400;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255 255 255)";
    ctx.arc(this.x, (canvas.height / 2) + this.y, 2, 0, Math.PI * 2);
    ctx.fill();;
  }

  connect(a, b, x, y) {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.strokeStyle = "rgba(0 255 0 /0.25)";
    ctx.lineWidth = 2;
    ctx.lineTo(x, y)
    ctx.stroke();
  }

}


function drawSine(pts = points.value, lam = lambda.value, amp = ampl.value, offset = 1) {
  let oldX = 0;
  let oldY = (canvas.height / 2) / Math.sin(0);
  for (let i = 0; i < pts; i++) {
    const x = lerp(0, canvas.width, i / (pts - 1));
    const angle = (x / canvas.width) * Math.PI * 2 * lam;
    const y = Math.sin(angle + offset) * amp;
    const point = new Point(x, y);
    point.draw();

    point.connect(oldX, oldY, x, y + canvas.height / 2);
    oldX = x;
    oldY = canvas.height / 2 + y;
  }
}

drawSine();


function lerp(a, b, t) {
  // lerp = start + (end - start) * amount;
  return a + (b - a) * t
}


lambda.addEventListener("input", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSine(points.value, e.target.value, ampl.value);
})

ampl.addEventListener("input", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSine(points.value, lambda.value, e.target.value);
})

points.addEventListener("input", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSine(e.target.value, lambda.value, ampl.value);
})

