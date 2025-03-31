const LIFE = 1;
let INIT_VY = -100;
let GRAVITY = 400;
let VARIANCE = 100;
let TOMATO = '🍅';
const POV = 0.5;

const tomatos = new Set()// { div, x, y, spawn, lastUpdate, vy, vx }
let cnt = 0;

function renderTomato(now, tomato) {
  const zoom = POV / (POV + (now - tomato.spawn) / 1000);
  tomato.div.style.transform = `translate(${tomato.x}px, ${tomato.y}px) scale(${zoom})`;
}

function updateTomato(now, tomato) {
  let dt = (now - tomato.lastUpdate) / 1000;
  let dying = (now - tomato.spawn) / 1000 >= LIFE;
  if(dying) dt = LIFE - (tomato.lastUpdate - tomato.spawn) / 1000;

  tomato.lastUpdate = now;

  tomato.x += tomato.vx * dt;
  tomato.y += tomato.vy * dt + 1/2 * GRAVITY * dt * dt;
  tomato.vy += GRAVITY * dt;

  return dying;
}

function dropTomato(tomato) {
  tomatos.delete(tomato);

  tomato.div.innerHTML = `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.69563762 38.43225379"><path d="M18.98199913,4.97441789c1.56389432,4.80745789-.46066328,7.62163229-2.44002861,8.29263583-2.53598286.8596961-4.29761578-4.38429468-9.15011136-3.87008242-1.84382446.19538768-3.83614081,1.67551244-3.96504717,3.20253725-.24510055,2.90345579,6.40775611,4.06600515,6.86258216,8.46385293.15587863,1.50723321-.4478001,3.08938046-1.37251658,4.1175483-2.50284238,2.78284525-6.6955892.77141179-8.31134895,3.05003683-1.27961983,1.80458492-.39350903,5.5250663,1.37251586,6.25257408,2.57504129,1.0607807,5.40751027-4.90627186,10.75137913-4.49880362,1.85716764.14160855,3.26719114.99590292,3.88879768,1.37251515,3.72767703,2.25849263,3.34935929,5.41581108,5.9475704,6.6338294,3.32293532,1.55776247,8.75531949-1.3500013,8.76885518-3.4312893.01447686-2.22604518-2.3623387-3.59522382-3.12628675-7.72005619-.08354425-.45108135-.02054675-1.91027265.68625821-2.97378559,2.20132386-3.31228302,5.92067206,2.11272658,9.30260999-1.35380229,1.78983712-1.83460815,1.98686044-5.52309556.53375573-6.93883308-2.24108389-2.18345025-4.10409597,3.31455119-8.4638493.59129322-.49912935-.31177438-2.17815591-2.27556367-2.51628011-4.04129836-.73223358-3.82383719,2.45043615-6.64531075,1.83002176-9.43639977-.73251878-3.29542044-9.33401606-3.47168043-10.67512761-1.00997524-.53308266.97851059-.83545238.49490025.07625032,3.29750287Z" fill="#ed2024"/><path d="M23.72192942,12.5577001c.51093442,2.75402331-1.44313217,4.30434921-3.70591707,5.2953825-1.28405586,4.90638674,1.54601253,7.48536382,3.98242138,11.20577448,1.25273644-6.92586461-2.39798413-6.51376096,6.72470957-5.88299674,3.45361313-4.01403833-5.1613199-2.7864131-7.52321941-3.30795619.38946259-2.19197062,2.66072592-5.89503736,1.06679418-7.83927725" fill="#51b848"/></svg>`

  tomato.div.classList.add('splash');
  const vpx = tomato.x - window.visualViewport.pageLeft;
  const vpy = tomato.y - window.visualViewport.pageTop;
  const stack = document.elementsFromPoint(vpx, vpy);
  const field = document.getElementById('field');
  const ctrl = document.getElementsByClassName('field-ctrl')[0];
  for(const el of stack) {
    // Skip tomato
    if(field && field.contains(el)) continue;
    if(ctrl && ctrl.contains(el)) continue;
    if(el.computedStyleMap().get('pointer-events').toString() === 'none') continue;
    console.log(el);
    return el;
  }

  return null;
}

console.log('🍅 registered');

document.addEventListener('click', function(event) {
  const ctrl = document.getElementsByClassName('field-ctrl')[0];
  if(event.pointerType === 'synthetic') return;
  if(ctrl && ctrl.contains(event.target)) return;
  console.log('clicked at ', event.pageX, event.pageY);
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  const div = document.createElement('div');
  const inner = document.createElement('div');
  inner.innerText = TOMATO;
  inner.className = 'tomato-inner';
  div.appendChild(inner);
  div.className = 'tomato';

  const now = document.timeline.currentTime;
  const tomato = {
    div,
    x: event.pageX,
    y: event.pageY,
    spawn: now,
    lastUpdate: now,
    vy: INIT_VY + (Math.random() - 1/2) * VARIANCE,
    vx: (Math.random() - 1/2) * VARIANCE,
  };
  renderTomato(now, tomato);

  const field = document.getElementById('field');
  field.appendChild(div);
  tomatos.add(tomato);
  cnt += 1;
  if(cnt === 10) {
    const ctrl = document.getElementsByClassName('field-ctrl')[0];
    window.localStorage.setItem('tomato-hint', 'true');
    if(ctrl.classList.contains('tucked')) {
      ctrl.classList.remove('tucked');
      ctrl.classList.add('hidden');
    }
  }
  
}, {
  capture: true,
});

function loop(ts) {
  const clickTargets = [];
  for (const tomato of tomatos) {
    const dying = updateTomato(ts, tomato);
    renderTomato(ts, tomato);
    if(dying) {
      const target = dropTomato(tomato);
      if(target) clickTargets.push(target);
    }
  }

  if(clickTargets.length > 0) {
    for (const target of clickTargets) {
      const event = new PointerEvent('click', {
        bubbles: true,
        pointerType: 'synthetic',
      });
      target.dispatchEvent(event);
    }
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function setData(key, value) {
  const input = document.getElementById(`field-${key}`);
  input.value = value;
  const ev = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(ev);
}

function lazerSettings() {
  setData('variance', 0);
  setData('gravity', 0);
  setData('init-vy', 0);
}

function defaultSettings() {
  setData('variance', 100);
  setData('gravity', 400);
  setData('init-vy', -100);
}

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementsByClassName('field-ctrl-toggle')[0];
  toggle.addEventListener('click', function() {
    const ctrl = document.getElementsByClassName('field-ctrl')[0];
    ctrl.classList.toggle('hidden');
  });

  const defaultBtn = document.getElementById('field-ctrl-default');
  defaultBtn.addEventListener('click', function() {
    defaultSettings();
  });

  const lazer = document.getElementById('field-ctrl-lazer');
  lazer.addEventListener('click', function() {
    lazerSettings();
  });

  const variance = document.getElementById('field-variance');
  variance.addEventListener('input', function() {
    VARIANCE = parseInt(variance.value);
    const varianceLabel = document.querySelector('label[for="field-variance"]');
    varianceLabel.innerText = `Variance: ${VARIANCE}`;
    window.localStorage.setItem('tomato-variance', VARIANCE);
  });

  const gravity = document.getElementById('field-gravity');
  gravity.addEventListener('input', function() {
    GRAVITY = parseInt(gravity.value);
    const gravityLabel = document.querySelector('label[for="field-gravity"]');
    gravityLabel.innerText = `Gravity: ${GRAVITY}`;
    window.localStorage.setItem('tomato-gravity', GRAVITY);
  });

  const init_vy = document.getElementById('field-init-vy');
  init_vy.addEventListener('input', function() {
    INIT_VY = parseInt(init_vy.value);
    const initVyLabel = document.querySelector('label[for="field-init-vy"]');
    initVyLabel.innerText = `Initial Velocity: ${INIT_VY}`;
    window.localStorage.setItem('tomato-init-vy', INIT_VY);
  });

  // Recover stored settings
  setData('variance', parseInt(window.localStorage.getItem('tomato-variance')) || 100);
  setData('gravity', parseInt(window.localStorage.getItem('tomato-gravity')) || 400);
  setData('init-vy', parseInt(window.localStorage.getItem('tomato-init-vy')) || -100);
  if(window.localStorage.getItem('tomato-hint') === 'true') {
    const ctrl = document.getElementsByClassName('field-ctrl')[0];
    ctrl.classList.remove('tucked');
    ctrl.classList.add('hidden');
  }
});
