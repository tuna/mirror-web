console.log("喵呜喵呜喵");

const modes = ["light", "dark", "darker", "lighter"] as const;
type Mode = typeof modes[number];

type DiscreteLoop = { x: number, y: number }[];

async function loadFont(fn: string): Promise<any> {
  const url = `/static/fonts/${fn}`;
  const req = await fetch(url);
  const resp = await req.arrayBuffer();
  return opentype.parse(resp);
}

let fonts: null | { regular: any[], bold: any[] } = null;

// TODO: wait for fonts
const allFonts = Promise.all([
  loadFont('Lato-Regular.ttf'), loadFont('sss-regular.otf'),
  loadFont('Lato-Bold.ttf'), loadFont('sss-bold.otf'),
]).then(([lr, sr, lb, sb]) => {
  fonts = {
    regular: [lr, sr],
    bold: [lb, sb],
  }
})

function resolveGlyph(char: string, fontSize: number, bold: boolean): string | null {
  if(fonts === null) throw new Error('fonts not yet loaded!');
  const fontset = bold ? fonts.bold : fonts.regular;

  for(const font of fontset) {
    const glyph = font.charToGlyph(char);
    if(!glyph || glyph.name === '.notdef') continue;

    const path = glyph.getPath(0, 0, fontSize);
    const asc = (font.ascender + font.descender) * fontSize / font.unitsPerEm;
    // console.log(asc / fontSize);

    // Assemble d:
    const d = path.commands.map(e => {
      if(e.type === 'M' || e.type === 'L') return `${e.type} ${e.x} ${e.y + asc}`;
      if(e.type === 'C') return `${e.type} ${e.x1} ${e.y1 + asc} ${e.x2} ${e.y2 + asc} ${e.x} ${e.y + asc}`;
      if(e.type === 'Q') return `${e.type} ${e.x1} ${e.y1 + asc} ${e.x} ${e.y + asc}`;
      if(e.type === 'Z') return 'Z';
      return '';
    }).join(' ');
    return d;
  }

  console.warn(`Glyph not found: ${char}`);
  return null;
}

const discretizationCache = new Map();
function discretize(path: string): DiscreteLoop {
  if(discretizationCache.has(path)) return discretizationCache.get(path);

  let loop: DiscreteLoop = window.discretizeSvgPath(path).map(([x, y]) => ({x, y}));
  const dx = loop[0].x - loop[loop.length - 1].x;
  const dy = loop[0].y - loop[loop.length - 1].y;
  if(dx < 0.001 && dy < 0.001) loop.pop();

  // for(let i = 0; i < cnt; ++i) {
  //   const t = (i + 1) * stepLen;
  //   const pt = el.getPointAtLength(t);
  //   const last = loop[loop.length - 1];
  //   const dx = last.x - pt.x;
  //   const dy = last.y - pt.y;
  //   if(dx * dx + dy * dy > stepLen * stepLen * 1.05) {
  //     // TODO: assert this is in current loop
  //     throw new Error(`Unexpected multiple-region loops: ${t} ${el.getAttribute('d')}`)
  //   }
  //   loop.push({ x: pt.x, y: pt.y });
  // }

  // Invert clockwise stuff
  let totalAng = 0;
  const angLog: number[] = []
  for(let i = 0; i < loop.length; ++i) {
    const cur = loop[i];
    const prev = loop[(i - 1 + loop.length) % loop.length];
    const next = loop[(i + 1) % loop.length];

    const dx1 = cur.x - prev.x;
    const dy1 = cur.y - prev.y;

    const dx2 = next.x - cur.x;
    const dy2 = next.y - cur.y;

    let ang = Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
    if(ang > Math.PI) ang -= Math.PI * 2;
    if(ang < -Math.PI) ang += Math.PI * 2;
    totalAng += ang;
    angLog.push(ang);
  }

  const rot = totalAng / (Math.PI * 2);
  if(Math.abs(rot) > 1.01 || Math.abs(rot) < 0.99)
    console.error(rot, loop, angLog);
  if(rot < 0) { // However remember we're up-side down. This turns it into clockwise (in our view)
    loop.reverse();
  }

  discretizationCache.set(path, loop);
  return loop;
}

function applyMode(m: Mode) {
  if(m === 'darker') {
    rescanAt(document.body);
    ensureDarker();
    renderLoop();
  }
}

let mx = 0;
let my = 0;
function tracker(e: MouseEvent) {
  mx = e.clientX;
  my = e.clientY;
}

function rescan(mutations: MutationRecord[], obs: MutationObserver) {
  for(const m of mutations) {
    if(m.type === 'attributes') continue;
    if(m.type === 'characterData') {
      // TODO: rescan node
      console.log('Don\'t know how to rescan characterData');
      continue;
    }

    for(const n of m.addedNodes) rescanAt(n as HTMLElement);
  }
}

// TODO: allow scaning arbitrary HTML-side nodes
function rescanAt(el: HTMLElement) {
  // Check if is svg
  if(el.tagName === 'svg') {
    rescanSVG(el as unknown as SVGElement);
    return;
  }

  if(el.classList?.contains('label-status')) {
    const r = parseFloat(window.getComputedStyle(el).borderRadius.match(/^[0-9.]+/)![0]);
    const { width, height } = el.getBoundingClientRect();
    const d = `
      M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0
      L ${ width - r } 0 A ${r} ${r} 0 0 1 ${width} ${r}
      L ${width} ${ height - r } A ${r} ${r} 0 0 1 ${width - r} ${height}
      L ${r} ${ height } A ${r} ${r} 0 0 1 0 ${height - r}
      z
    `;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
    svg.style.width = width + 'px';
    svg.style.height = height + 'px';
    svg.classList.add('darker-rounded-debug');

    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');

    path.setAttribute('d', d);
    path.classList.add('darker-processed');
    path.classList.add('darker-surrogate');

    svg.appendChild(path);
    el.appendChild(svg);

    svg.classList.add('darker-traced');
    rescanAt(svg as unknown as HTMLElement);
  }

  for(const child of el.childNodes) {
    if(child.nodeType === Node.TEXT_NODE) {
      let inner = child.nodeValue;
      if(!inner) continue;

      inner = inner.replace('\n', ' ');

      const wrapper = document.createElement('span');
      wrapper.classList.add('darker-text-group');

      const styles = window.getComputedStyle(el);
      const fs = styles.fontSize;
      const fsNum = parseFloat(fs.match(/^[0-9.]+/)![0]);
      const isBold = styles.fontWeight !== '400';

      while(inner !== '') {
        // Trim empty stuff
        const startTrim = inner.length - inner.trimStart().length;
        if(startTrim != 0) {
          const startEmpty = inner.substring(0, startTrim);

          const node = document.createElement('span');
          node.classList.add('darker-text-empty');
          node.innerText = ' ';
          wrapper.appendChild(node);

          inner = inner.trimStart();
        } else {
          const first = inner.substring(0, 1);
          inner = inner.substring(1);

          const node = document.createElement('span');
          node.classList.add('darker-text');
          const holder = document.createElement('span');
          holder.innerText = first;
          node.appendChild(holder);

          wrapper.appendChild(node);

          // console.log(fsNum);
          const glyph = resolveGlyph(first, fsNum, isBold);
          if(!glyph) continue;

          node.classList.add('darker-traced');
          node.setAttribute('data-glyph', glyph);

          // console.log(first, glyph);

          // Debug
          // TODO: drop me
          setTimeout(() => {
            const { width, height } = node.getBoundingClientRect();
            const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
            svg.style.width = width + 'px';
            svg.style.height = height + 'px';
            svg.classList.add('darker-text-render');

            const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            path.setAttribute('d', glyph);
            path.classList.add('darker-processed');
            path.classList.add('darker-text-display');
            svg.appendChild(path);

            node.appendChild(svg);
          });
        }
      }

      el.replaceChild(wrapper, child);
    } else {
      // Skip processed elements
      if(el.classList.contains('darker-text-group')) continue;
      if(el.classList.contains('darker-text-svg')) continue;

      rescanAt(child as HTMLElement);
    }
  }
}

const symbolCache: Record<string, string[]> = {};
const svgCache: Record<string, string[]> = {};
let svgIDGen = 0;

function splitPathSegs(path: string): SVGPathElement[] {
  let d = path;

  const segs: string[] = [];
  while(true) {
    // console.log(d);
    const nextMoveIdx = d.substring(1).toLowerCase().indexOf('m');
    if(nextMoveIdx === -1) {
      segs.push(d);
      break;
    }
    segs.push(d.substring(0, nextMoveIdx + 1));
    d = d.substring(nextMoveIdx + 1);
  }

  let last = { x: 0, y: 0 };
  const paths: [SVGPathElement, Path2D][] = [];
  for(const seg of segs) {
    const [firstMove, mx, my] = seg.match(/^[mM] *(-?[.0-9]+) *(-?[.0-9]+)/)!;
    // console.log(firstMove);
    const d = firstMove[0] === 'M' ? seg : `M ${last.x + parseFloat(mx)} ${last.y + parseFloat(my)} ${seg.substring(firstMove.length)}`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('d', d);
    path.classList.add('darker-processed');
    path.classList.add('darker-surrogate');
    last = path.getPointAtLength(path.getTotalLength());
    paths.push([path, new Path2D(d)]);
  }

  const tmpCtx = document.createElement('canvas').getContext('2d')!;
  const outerPaths: SVGPathElement[] = [];
  for(const [path, _] of paths) {
    const starting = path.getPointAtLength(0);
    let outer = true;
    for(const [another, repr] of paths) if(another !== path) {
      if(tmpCtx.isPointInPath(repr, starting.x, starting.y)) {
        outer = false;
        break;
      }
    }

    if(outer) outerPaths.push(path);
  }

  return outerPaths;
}

// TODO: cache DOM
function rescanSVG(el: SVGElement) {
  if(el.classList.contains('darker-processed')) return;

  if(el.tagName === 'path') {
    let d = el.getAttribute('d') ?? '';
    const segs = splitPathSegs(d);
    for(const path of segs) el.parentNode!.appendChild(path);
  } else if(el.tagName === 'use') {
    el.classList.add('darker-traced');
    // const xlink = el.getAttribute('xlink:href');
  }
  // TODO: trace texts

  for(const child of el.children) {
    rescanSVG(child as SVGElement);
  }

  if(el.tagName === 'symbol' && el.id !== '') {
    // Cache symbol content
    const allPaths = el.querySelectorAll(".darker-surrogate");
    const ret: string[] = [];
    for(const p of allPaths) ret.push(p.getAttribute('d')!);
    symbolCache[el.id] = ret;
  } else if(el.tagName === 'svg' && el.getAttribute('display') !== 'none') {
    const id = svgIDGen++;
    el.id = `darker-svg-${id}`;
    const allPaths = el.querySelectorAll(".darker-surrogate");
    const ret: string[] = [];
    for(const p of allPaths) ret.push(p.getAttribute('d')!);
    svgCache[el.id] = ret;
  }

  el.classList.add('darker-processed');
}

let obs: MutationObserver | null = null;
let canvas: HTMLCanvasElement | null = null;
function ensureDarker() {
  if(obs === null) {
    obs = new MutationObserver(rescan)
    obs.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if(canvas === null) {
    canvas = document.createElement('canvas');
    canvas.classList.add('darker-canvas');
    document.body.appendChild(canvas);
  }
}

const textCache: WeakMap<Element, string[]> = new WeakMap();

let renderStopped = false;
function renderLoop() {
  if(renderStopped) return;
  if(canvas === null) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d')!;

  const traced = document.getElementsByClassName('darker-traced');
  let cnt = 0;

  function tracePaths(paths: string[], sx: number, sy: number, width: number, height: number, scale: number) {
    for(const path of paths) {
      const dpath = discretize(path);
      if(dpath.length === 1) continue;
      ctx.beginPath();

      let lastAng: number | null = null;
      let incRegionStart: { x: number, y: number } | null = null;

      function commit(x: number, y: number) {
        if(incRegionStart === null) return;
        let color = `black`;
        // if(x < sx || x > sx + width || y < sy || y > sy + height) {
        //   color = 'red';
        // }

        const { x: bx, y: by } = incRegionStart;

        // if(bx < sx || bx > sx + width || by < sy || by > sy + height) {
        //   color = 'green';
        // }

        ctx.fillStyle = `${color}`;

        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo((bx - mx) * 1000 + bx, (by - my) * 1000 + by);
        ctx.lineTo((x - mx) * 1000 + x, (y - my) * 1000 + y);
        ctx.lineTo(x, y);
        ctx.fill();

        cnt += 2;

        lastAng = null;
        incRegionStart = null;
      }

      for(let i = 0; i < dpath.length; ++i) {
        const cx = dpath[i].x * scale + sx;
        const cy = dpath[i].y * scale + sy;

        const nx = dpath[(i + 1) % dpath.length].x * scale + sx;
        const ny = dpath[(i + 1) % dpath.length].y * scale + sy;

        // Test angle. This is a counter-clockwise loop (in canonical axis orientation)
        const segAng = Math.atan2(nx - cx, ny - cy);
        const rayAng = Math.atan2(cx - mx, cy - my);

        let diffAng = segAng - rayAng;
        if(diffAng > Math.PI) diffAng -= Math.PI * 2;
        if(diffAng < -Math.PI) diffAng += Math.PI * 2;
        if(diffAng < 0 || diffAng > Math.PI) {
          commit(cx, cy);
          // TODO: commit
          continue;
        }

        // Check for continous increasing region
        if(lastAng === null) {
          lastAng = segAng;
          incRegionStart = { x: cx, y: cy };
          continue;
        }

        let diffLastAng = segAng - rayAng;
        if(diffLastAng > Math.PI) diffLastAng -= Math.PI * 2;
        if(diffLastAng < -Math.PI) diffLastAng += Math.PI * 2;
        if(diffLastAng > 0) {
          lastAng = segAng;
          continue;
        } else {
          commit(cx, cy);
          lastAng = segAng;
          continue;
        }
      }

      const bx = dpath[0].x * scale + sx;
      const by = dpath[0].y * scale + sy;
      commit(bx, by);
    }
  }

  for(const trace of traced) {
    const { x: sx, y: sy, width, height } = trace.getBoundingClientRect();
    let scale = 1;

    if(trace.tagName === 'use') {
      const sym = document.getElementById(trace.getAttribute('xlink:href')!.substring(1)) as unknown as SVGSymbolElement;
      const vbox = sym.viewBox.baseVal;
      // TODO: handle browsers without baseVal
      // TODO: handle origins other than 0,0

      const scale = width / vbox.width;
      const vscale = height / vbox.height;
      // if(scale > vscale * 1.01 || scale < vscale * 0.99)
      //   console.warn(`incompatible scales: ${scale}, ${vscale}`);
      const paths: string[] | undefined = symbolCache[sym.id];
      if(paths === undefined) {
        console.warn(`Symbol not in cache: ${sym.id}`);
        continue;
      }

      tracePaths(paths, sx, sy, width, height, scale)
    } else if(trace.tagName === 'svg') {
      const paths: string[] | undefined = svgCache[trace.id];
      if(paths === undefined) {
        console.warn(`SVG not in cache: ${trace.id}`);
        continue;
      }
      tracePaths(paths, sx, sy, width, height, 1);
    } else if(trace.classList.contains('darker-text')) {
      let cached = textCache.get(trace);
      if(!cached) {
        const glyph = trace.getAttribute('data-glyph')!;
        const paths = splitPathSegs(glyph);
        cached = paths.map(e => e.getAttribute('d')!);
        textCache.set(trace, cached);
      }
      tracePaths(cached, sx, sy, width, height, 1);
    }
  }

  console.log(cnt);

  requestAnimationFrame(renderLoop);
}

document.addEventListener('DOMContentLoaded', () => {
  const dark = document.getElementsByClassName('dark-switch-inner')[0];
  dark.addEventListener('click', () => {
    const parent = dark.parentNode as HTMLElement;
    const cur = parent.getAttribute("data-mode");
    const idx = (modes.findIndex(e => e === cur) + 1) % modes.length;
    const next = modes[idx];
    applyMode(next);
    parent.setAttribute('data-mode', next);
  })

  document.addEventListener('mousemove', tracker);
})
