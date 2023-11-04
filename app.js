let current = {};
let target = {};
let delta = {};
let initial = {};
const $ = {};
const mousemoveActions = new Set();

const mouse = {
  init,
  current,
  target,
  delta,
  initial,
  tick: 0,
};
function init() {
  const initial = {
    x: 0,
    y: 0,
    r: 40,
    fill: "#ffffff",
    fillOpacity: 0,
    strokeWidth: 1,
  };
  Object.assign(current, initial);
  Object.assign(target, initial);
  Object.assign(delta, { x: 0, y: 0, scale: 1, fillOpacity: 0 });

  $.outerCircle = document.getElementById("outer-circle");
  $.innerCircle = document.getElementById("inner-circle");
  _bindEvents();
}
function updateMousePosition(event) {
  target.x = event.clientX;
  target.y = event.clientY;
  mouse.tick++;
}
function _updateValue() {
  delta.x = target.x - current.x;
  delta.y = target.y - current.y;
  current.x += delta.x * 0.2;
  current.y += delta.y * 0.2;
  let distort = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2)) / 500;
  distort = Math.min(distort, 0.4);
  current.scaleX = 1 + distort;
  current.scaleY = 1 - distort;
  current.rotate = (Math.atan2(delta.y, delta.x) / Math.PI) * 180;
}
function _updateStyle() {
  $.outerCircle.setAttribute("cx", current.x);
  $.innerCircle.setAttribute("cx", target.x);
  $.outerCircle.setAttribute("cy", current.y);
  $.innerCircle.setAttribute("cy", target.y);
  const rotate = `rotate(${current.rotate}deg)`;
  const scale = `scale(${current.scaleX},${current.scaleY})`;
  $.outerCircle.style.transformOrigin = `${current.x}px ${current.y}px`;
  $.outerCircle.style.transform = `${rotate}${scale}`;
}

function animateStalker() {
  requestAnimationFrame(animateStalker);
  _updateValue();
  _updateStyle();
}
function _bindEvents() {
  window.addEventListener("mousemove", updateMousePosition);
  animateStalker();
}
init();
