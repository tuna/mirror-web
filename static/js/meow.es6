---
---

const Matter = window.Matter;

function findNearestBlock(elem) {
  if(elem === null || elem === document.body) return null;
  const styleSet = getComputedStyle(elem);
  if(elem.tagName !== 'svg' && styleSet['display'] !== 'inline') return elem;
  return findNearestBlock(elem.parentNode);
}

let engine = null;

window.addEventListener('devicemotion', ev => {
  if(!engine) return;
  if(ev.accelerationIncludingGravity) {
    const x = ev.accelerationIncludingGravity.x;
    const y = ev.accelerationIncludingGravity.y;
    if(x === null || y === null) return;
    const grav = Matter.Vector.create(x * 0.0002, - y * 0.0002);
    const gravScale = Matter.Vector.magnitude(grav);
    const gravDir = Matter.Vector.normalise(grav);

    engine.gravity.x = gravDir.x;
    engine.gravity.y = gravDir.y;
    engine.gravity.scale = gravScale;
  }

  if(ev.rotationRate) {
    const gamma = ev.rotationRate.gamma;
    if(gamma === null) return;

    const centerX = window.innerWidth / 2 + window.scrollX;
    const centerY = window.innerHeight / 2 + window.scrollY;
    for(const body of engine.world.bodies)
      Matter.Body.rotate(body, gamma * 0.0002, { x: centerX, y: centerY });
  }
});

function bootstrap() {
  engine = Matter.Engine.create({
    gravity: {
      x: 0,
      y: -0.1,
    }
  });
  const floatings = new Map();

  // Create walls
  let walls = null;
  function buildWalls() {
    const WALL_DEPTH = 10000;
    const topWall = Matter.Bodies.rectangle(
      window.innerWidth / 2 + window.scrollX, 
      -WALL_DEPTH / 2 + window.scrollY,
      window.innerWidth + 2 * WALL_DEPTH,
      WALL_DEPTH,
      {
        isStatic: true,
        restitution: 0.8,
      }
    );

    const bottomWall = Matter.Bodies.rectangle(
      window.innerWidth / 2 + window.scrollX,
      window.innerHeight + WALL_DEPTH / 2 + window.scrollY,
      window.innerWidth + 2 * WALL_DEPTH,
      WALL_DEPTH,
      {
        isStatic: true,
        restitution: 0.8,
      }
    );
    
    const leftWall = Matter.Bodies.rectangle(
      -WALL_DEPTH / 2 + window.scrollX,
      window.innerHeight / 2 + window.scrollY,
      WALL_DEPTH,
      window.innerHeight + 2 * WALL_DEPTH,
      {
        isStatic: true,
        restitution: 0.8,
      }
    );
    
    const rightWall = Matter.Bodies.rectangle(
      window.innerWidth + WALL_DEPTH / 2 + window.scrollX,
      window.innerHeight / 2 + window.scrollY,
      WALL_DEPTH,
      window.innerHeight + 2 * WALL_DEPTH,
      {
        isStatic: true,
        restitution: 0.8,
      }
    );

    if(walls) Matter.Composite.remove(engine.world, walls);
    walls = Matter.Composite.create();
    Matter.Composite.add(walls, [topWall, bottomWall, leftWall, rightWall]);
    Matter.Composite.add(engine.world, walls);
  }

  buildWalls();
  window.addEventListener('resize', buildWalls);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.left = 0;
  overlay.style.top = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style['pointer-events'] = 'none';
  document.body.appendChild(overlay);

  // const bounds = Matter.Bounds.create([{ x: 0, y: 0 }, { x: window.innerWidth, y: window.innerHeight }]);

  /*
  const debugRender = Matter.Render.create({
    element: overlay,
    engine,
    bounds,
    options: {
      background: 'transparent',
      wireframeBackground: 'transparent',
      width: window.innerWidth,
      height: window.innerHeight,
      hasBounds: true,
    },
  });
  Matter.Render.run(debugRender);
  */

  let lastRender = performance.now();
  let lastScrollX = window.scrollX;
  let lastScrollY = window.scrollY;
  let lastScreenX = window.screenX;
  let lastScreenY = window.screenY;
  let lastScreenUpdate = lastRender;

  function render(ts) {
    const diff = Math.min(ts - lastRender, 100); // At max 100ms to avoid wierd effects
    lastRender = ts;

    const curScrollX = window.scrollX;
    const curScrollY = window.scrollY;

    if(ts > lastScreenUpdate + 100) {

      if(walls)
        Matter.Composite.translate(walls, {
          x: curScrollX - lastScrollX,
          y: curScrollY - lastScrollY,
        });

      lastScrollX = curScrollX;
      lastScrollY = curScrollY;

      const diffScreenX = window.screenX - lastScreenX;
      const diffScreenY = window.screenY - lastScreenY;
      for(const body of engine.world.bodies) {
        if(body === walls) continue;
        Matter.Body.translate(body, {
          x: -diffScreenX,
          y: -diffScreenY,
        });
      }
      lastScreenX = window.screenX;
      lastScreenY = window.screenY;
    }

    /*
    Matter.Bounds.translate(bounds, {
      x: curScrollX - lastScrollX,
      y: curScrollY - lastScrollY,
    });
    */

    Matter.Engine.update(engine, diff);

    const bodies = Matter.Composite.allBodies(engine.world);
    for(const body of bodies) {
      const id = body.id;
      const query = floatings.get(id);
      if(!query) continue;
      const [floating, width, height] = query;
      if(!floating || !floating.offsetParent) {
        // DOM is removed
        floatings.delete(id);
        Matter.Composite.remove(engine.world, body);
        continue;
      }

      const { top, left } = floating.offsetParent.getBoundingClientRect();
      const x = left + floating.offsetLeft + width / 2;
      const y = top + floating.offsetTop + height / 2;
      const toX = body.position.x - curScrollX;
      const toY = body.position.y - curScrollY;
      const rotation = body.angle;

      floating.style.transform = `translate(${toX - x}px, ${toY - y}px) rotate(${rotation}rad)`;
      // floating.style.setProperty('--inverse', `rotate(${-rotation}rad) translate(${- toX + x}px, ${- toY + y}px)`);
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  document.body.addEventListener('click', e => {
    const floating = findNearestBlock(e.target);
    if(floating.classList.contains('meow-floating')) return true;
    // filter if has floating childern
    if(floating.querySelector('.meow-floating')) return true;
    e.preventDefault();
    e.stopImmediatePropagation();

    // Flush
    // const computed = getComputedStyle(floating);
    // const width = computed.width;
    // const height = computed.height;

    const { top, left, width, height } = floating.getBoundingClientRect();
    if(height > 600) return true;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const worldX = scrollX + left;
    const worldY = scrollY + top;

    const box = Matter.Bodies.rectangle(worldX + width / 2, worldY + height / 2, width, height, { restitution: 0.8 });
    const id = box.id;

    // Apply random velocity at start
    const initVelX = Math.random() * 2 - 1;
    const initVelY = Math.random() * 2 - 1;
    const initVelAng = Math.random() * 0.02 - 0.01;
    Matter.Body.setVelocity(box, { x: initVelX, y: initVelY });
    Matter.Body.setAngularVelocity(box, initVelAng);

    floating.style.setProperty('--real-width', `${width}px`);
    floating.style.setProperty('--real-height', `${height}px`);
    floating.classList.add('meow-floating');
    // Hacks for popovers
    const triggers = floating.querySelectorAll('a[data-toggle=popover]');
    for(const a of triggers) {
      a.addEventListener('mouseover', e => {
        e.stopImmediatePropagation();
      }, true);
    }
    const popovers = floating.querySelectorAll('.popover');
    for(const popover of popovers) popover.remove();

    floatings.set(id, [floating, width, height]);
    Matter.Composite.add(engine.world, box);

    return false;
  }, true);
}

document.body.onload = bootstrap;
