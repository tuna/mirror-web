console.log("喵呜喵呜喵");

const modes = ["light", "dark", "darker", "lighter"];
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  modes[0] = 'dark';
  modes[1] = 'light';

  const toggle = document.getElementsByClassName('dark-switch')[0];
  toggle.setAttribute('data-mode', 'dark');
}

type DiscreteLoop = { x: number, y: number }[];
const tmpCtx = document.createElement('canvas').getContext('2d')!;

const vertShaderSrc = `
attribute vec4 a_pos;
uniform vec2 u_screen;
uniform vec2 u_mouse;
uniform vec2 u_offset;

varying float v_opacity;

void main() {
  vec2 pos_screen = a_pos.xy + u_offset;
  vec2 pos_translated;
  vec2 diff = pos_screen - u_mouse;
  pos_translated.x = pos_screen.x + diff.x * a_pos.z;
  pos_translated.y = pos_screen.y + diff.y * a_pos.z;
  gl_Position.x = pos_translated.x / u_screen.x * 2.0 - 1.0;
  gl_Position.y = - (pos_translated.y / u_screen.y * 2.0 - 1.0);
  gl_Position.z = 0.0;
  gl_Position.w = 1.0;

  float dist = sqrt(diff.x * diff.x + diff.y * diff.y);
  // 30 - 50px
  v_opacity = clamp((dist - 30.0) / 20.0, 0.0, 1.0);
}
`;

const fragShaderSrc = `
precision mediump float;
varying float v_opacity;

void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, v_opacity);
}
`;

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

async function applyMode(m: string) {
  (document.body.parentElement as HTMLElement).classList.remove('forced-light');
  (document.body.parentElement as HTMLElement).classList.remove('forced-dark');
  if(m === 'light' || m === 'dark') {
    (document.body.parentElement as HTMLElement).classList.add(`forced-${m}`);
  } else if(m === 'darker') {
    (document.body.parentElement as HTMLElement).classList.add('forced-light');
    document.body.classList.add('darker-engaging');
    await allFonts;
    setTimeout(() => {
      ensureCanvas();
      rescanAt(document.body);
      // TODO: async reassemble
      reassemble();
      ensureObs();
      renderLoop();
      document.body.classList.remove('darker-engaging');
    }, 100);
  } else {
    const tmpl = document.querySelector('.dark-switch-icon[data-active="lighter"] svg')!.cloneNode(true);
    const flames = document.querySelector('.flames')!;

    renderStopped = true;
    document.body.classList.add('darker-cleanup');
    setTimeout(() => {
      document.body.addEventListener('click', e => {
        (e.target as HTMLElement).remove();
        e.preventDefault();
        const inserted = tmpl.cloneNode(true) as HTMLElement;
        inserted.style.top = e.pageY + 'px';
        inserted.style.left = e.pageX + 'px';

        flames.appendChild(inserted);
      })
    });
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
  setTimeout(() => reassemble());
}

// TODO: allow scaning arbitrary HTML-side nodes
function rescanAt(el: HTMLElement) {
  if(el.classList?.contains('sr-only')) return;
  if(el.classList?.contains('dark-switch-hint')) return;

  // Check if is svg
  if(el.tagName === 'svg') {
    rescanSVG(el as unknown as SVGElement);
    return;
  }

  if(el.classList?.contains('label-status') || el.classList?.contains('label-new') || el.classList?.contains('input-wrapper') || el.classList?.contains('popover')) {
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
    svg.classList.add('darker-traced-misc');
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
          // setTimeout(() => {
          //   const { width, height } = node.getBoundingClientRect();
          //   const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
          //   svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
          //   svg.style.width = width + 'px';
          //   svg.style.height = height + 'px';
          //   svg.classList.add('darker-text-render');

          //   const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
          //   path.setAttribute('d', glyph);
          //   path.classList.add('darker-processed');
          //   path.classList.add('darker-text-display');
          //   svg.appendChild(path);

          //   node.appendChild(svg);
          // });
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
  const paths: [SVGPathElement, { x: number, y: number }, Path2D][] = [];
  for(const seg of segs) {
    const [firstMove, mx, my] = seg.match(/^[mM] *(-?[.0-9]+) *(-?[.0-9]+)/)!;
    // console.log(firstMove);
    const bx = firstMove[0] === 'M' ? parseFloat(mx) : last.x + parseFloat(mx);
    const by = firstMove[0] === 'M' ? parseFloat(my) : last.y + parseFloat(my);
    const d = `M ${bx} ${by} ${seg.substring(firstMove.length).trim()}`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('d', d);
    path.classList.add('darker-processed');
    path.classList.add('darker-surrogate');
    if(d[d.length-1] === 'z' || d[d.length-1] === 'Z') {
      last = { x: bx, y: by };
    } else {
      console.error(`Cannot find path end: ${d}`);
      last = { x: bx, y: by };
    }
    paths.push([path, { x: bx, y: by }, new Path2D(d)]);
  }

  const outerPaths: SVGPathElement[] = [];
  for(const [path, starting, _] of paths) {
    let outer = true;
    for(const [another, _, repr] of paths) if(another !== path) {
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
let backdrop: HTMLCanvasElement | null = null;
let overlay: HTMLCanvasElement | null = null;
const shaderCtx = {
  a_pos: null as WebGLBuffer | null,

  u_screen_loc: null as WebGLUniformLocation | null,
  u_mouse_loc: null as WebGLUniformLocation | null,
  u_offset_loc: null as WebGLUniformLocation | null,

  triangleCnt: 0,
  gl: null as WebGLRenderingContext | null,
};

function ensureCanvas() {
  const container = document.createElement('div');
  container.classList.add('darker-canvases');

  if(backdrop === null) {
    backdrop = document.createElement('canvas');
    container.appendChild(backdrop);
  }
  if(canvas === null) {
    canvas = document.createElement('canvas');
    canvas.classList.add('darker-canvas');
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl');
    if(!gl) {
      alert('WebGL Missing!');
      return;
    }

    shaderCtx.gl = gl;

    const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(vertShader, vertShaderSrc);
    gl.shaderSource(fragShader, fragShaderSrc);
    gl.compileShader(vertShader);
    console.log(gl.getShaderInfoLog(vertShader));
    gl.compileShader(fragShader);
    console.log(gl.getShaderInfoLog(fragShader));
    // TODO: check compile status

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);

    const a_pos_loc = gl.getAttribLocation(prog, 'a_pos');
    shaderCtx.a_pos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shaderCtx.a_pos);

    gl.useProgram(prog);
    gl.enableVertexAttribArray(a_pos_loc);
    gl.vertexAttribPointer(a_pos_loc, 3, gl.FLOAT, false, 0, 0);

    shaderCtx.u_screen_loc = gl.getUniformLocation(prog, 'u_screen');
    shaderCtx.u_mouse_loc = gl.getUniformLocation(prog, 'u_mouse');
    shaderCtx.u_offset_loc = gl.getUniformLocation(prog, 'u_offset');
  }
  if(overlay === null) {
    overlay = document.createElement('canvas');
    container.appendChild(overlay);
  }

  document.body.appendChild(container);
}

function ensureObs() {
  if(obs === null) {
    obs = new MutationObserver(rescan)
    obs.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

const textCache: WeakMap<Element, string[]> = new WeakMap();
const assembleCache: WeakMap<Element, number[]> = new WeakMap();

function reassemble() {
  const traced = document.getElementsByClassName('darker-traced');

  function assemblePath(paths: string[], sx: number, sy: number, scale: number): number[] {
    const buf: number[] = [];
    for(const path of paths) {
      const dpath = discretize(path);
      if(dpath.length === 1) continue;

      for(let i = 0; i < dpath.length; ++i) {
        let cx = dpath[i].x * scale + sx;
        let cy = dpath[i].y * scale + sy;

        let nx = dpath[(i + 1) % dpath.length].x * scale + sx;
        let ny = dpath[(i + 1) % dpath.length].y * scale + sy;

        // Expand a little bit
        buf.push(
          cx, cy, -0.01,
          nx, ny, -0.01,
          cx, cy, 100,

          cx, cy, 100,
          nx, ny, 100,
          nx, ny, -0.01,
        );
      }
    }
    return buf;
  }

  const total: number[] = [];
  for(const trace of traced) {
    if(assembleCache.has(trace)) {
      const cached = assembleCache.get(trace)!;
      total.push(...cached);
      continue;
    }

    const { x, y, width, height } = trace.getBoundingClientRect();

    let populated: number[] = [];

    if(trace.tagName === 'use') {
      const sym = document.getElementById(trace.getAttribute('xlink:href')!.substring(1)) as unknown as SVGSymbolElement;
      const vbox = sym.viewBox.baseVal;
      // TODO: handle browsers without baseVal
      // TODO: handle origins other than 0,0

      // Firefox fucks up its dimension calculation
      const parentDims = trace.parentElement!.getBoundingClientRect();

      const scale = parentDims.width / vbox.width;
      const vscale = parentDims.height / vbox.height;
      // if(scale > vscale * 1.01 || scale < vscale * 0.99)
      //   console.warn(`incompatible scales: ${scale}, ${vscale}`);
      const paths: string[] | undefined = symbolCache[sym.id];
      if(paths === undefined) {
        console.warn(`Symbol not in cache: ${sym.id}`);
        continue;
      }

      populated = assemblePath(paths, x, y + window.scrollY, scale);
    } else if(trace.tagName === 'svg') {
      let scale = 1;
      const vb = trace.getAttribute('viewBox');
      if(vb) {
        const [_, __, vboxw, vboxh] = vb.split(' ').map(e => parseFloat(e))!;
        scale = width / vboxw;
      }
      const paths: string[] | undefined = svgCache[trace.id];
      if(paths === undefined) {
        console.warn(`SVG not in cache: ${trace.id}`);
        continue;
      }
      populated = assemblePath(paths, x, y + window.scrollY, scale);
    } else if(trace.classList.contains('darker-text')) {
      let cached = textCache.get(trace);
      if(!cached) {
        const glyph = trace.getAttribute('data-glyph')!;
        const paths = splitPathSegs(glyph);
        cached = paths.map(e => e.getAttribute('d')!);
        textCache.set(trace, cached);
      }
      populated = assemblePath(cached, x, y + window.scrollY, 1);
    }

    assembleCache.set(trace, populated);
    total.push(...populated);
  }

  // TODO: error on me
  if(!shaderCtx.gl) return;

  shaderCtx.gl.bufferData(shaderCtx.gl.ARRAY_BUFFER, new Float32Array(total), shaderCtx.gl.STATIC_DRAW);
  shaderCtx.triangleCnt = total.length / 3;
}

let renderStopped = false;
function renderLoop() {
  if(renderStopped) return;
  if(!canvas || !backdrop || !overlay || !shaderCtx.gl) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  {
    backdrop.width = window.innerWidth;
    backdrop.height = window.innerHeight;
    const ctx = backdrop.getContext('2d')!;
    const grad = ctx.createRadialGradient(mx, my, 100, mx, my, 600);
    grad.addColorStop(0, "#222");
    grad.addColorStop(1, "#111");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, backdrop.width, backdrop.height);
  }

  const gl = shaderCtx.gl;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform2fv(shaderCtx.u_screen_loc, [window.innerWidth, window.innerHeight]);
  gl.uniform2fv(shaderCtx.u_mouse_loc, [mx, my]);
  gl.uniform2fv(shaderCtx.u_offset_loc, [0, -window.scrollY]);

  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);
  // gl.enable(gl.SAMPLE_COVERAGE);
  // gl.sampleCoverage(0.5, false);

  gl.drawArrays(gl.TRIANGLES, 0, shaderCtx.triangleCnt);

  {
    overlay.width = window.innerWidth;
    overlay.height = window.innerHeight;
    const ctx = overlay.getContext('2d')!;
    const grad = ctx.createRadialGradient(mx, my, 40, mx, my, 60);
    grad.addColorStop(0, "rgba(255,255,255,0.4)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, overlay.width, overlay.height);
  }

  requestAnimationFrame(renderLoop);
}

document.addEventListener('DOMContentLoaded', () => {
  const dark = document.getElementsByClassName('dark-switch-inner')[0];
  const hint = document.querySelector('.dark-switch-hint');

  dark.addEventListener('click', () => {
    hint?.classList.add('dark-switch-hint-ack');
    window.localStorage.setItem('2024-april-fools', 'meow');

    const parent = dark.parentNode as HTMLElement;
    const cur = parent.getAttribute("data-mode");
    if(cur === 'lighter') return;
    const idx = (modes.findIndex(e => e === cur) + 1) % modes.length;
    const next = modes[idx];
    applyMode(next);
    parent.setAttribute('data-mode', next);
  })

  if(hint) {
    hint.addEventListener('click', e => {
      hint.classList.add('dark-switch-hint-ack');
      window.localStorage.setItem('2024-april-fools', 'meow');
    })

    if(window.localStorage.getItem('2024-april-fools') === null)
      hint.classList.remove('dark-switch-hint-ack');
  }

  document.addEventListener('mousemove', tracker);
})
