var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
console.log("喵呜喵呜喵");
var modes = ["light", "dark", "darker", "lighter"];
var vertShaderSrc = "\nattribute vec4 a_pos;\nuniform vec2 u_screen;\nuniform vec2 u_mouse;\nuniform vec2 u_offset;\n\nvarying float v_opacity;\n\nvoid main() {\n  vec2 pos_screen = a_pos.xy + u_offset;\n  vec2 pos_translated;\n  vec2 diff = pos_screen - u_mouse;\n  pos_translated.x = pos_screen.x + diff.x * a_pos.z;\n  pos_translated.y = pos_screen.y + diff.y * a_pos.z;\n  gl_Position.x = pos_translated.x / u_screen.x * 2.0 - 1.0;\n  gl_Position.y = - (pos_translated.y / u_screen.y * 2.0 - 1.0);\n  gl_Position.z = 0.0;\n  gl_Position.w = 1.0;\n\n  float dist = sqrt(diff.x * diff.x + diff.y * diff.y);\n  // 30 - 50px\n  v_opacity = clamp((dist - 30.0) / 20.0, 0.0, 1.0);\n}\n";
var fragShaderSrc = "\nprecision mediump float;\nvarying float v_opacity;\n\nvoid main() {\n  gl_FragColor = vec4(0.0, 0.0, 0.0, v_opacity);\n}\n";
var radialVertShaderSrc = "\n\n";
var radialFragShaderSrc = "\n";
function loadFont(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var url, req, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/static/fonts/".concat(fn);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    req = _a.sent();
                    return [4 /*yield*/, req.arrayBuffer()];
                case 2:
                    resp = _a.sent();
                    return [2 /*return*/, opentype.parse(resp)];
            }
        });
    });
}
var fonts = null;
// TODO: wait for fonts
var allFonts = Promise.all([
    loadFont('Lato-Regular.ttf'), loadFont('sss-regular.otf'),
    loadFont('Lato-Bold.ttf'), loadFont('sss-bold.otf'),
]).then(function (_a) {
    var lr = _a[0], sr = _a[1], lb = _a[2], sb = _a[3];
    fonts = {
        regular: [lr, sr],
        bold: [lb, sb],
    };
});
function resolveGlyph(char, fontSize, bold) {
    if (fonts === null)
        throw new Error('fonts not yet loaded!');
    var fontset = bold ? fonts.bold : fonts.regular;
    var _loop_1 = function (font) {
        var glyph = font.charToGlyph(char);
        if (!glyph || glyph.name === '.notdef')
            return "continue";
        var path = glyph.getPath(0, 0, fontSize);
        var asc = (font.ascender + font.descender) * fontSize / font.unitsPerEm;
        // console.log(asc / fontSize);
        // Assemble d:
        var d = path.commands.map(function (e) {
            if (e.type === 'M' || e.type === 'L')
                return "".concat(e.type, " ").concat(e.x, " ").concat(e.y + asc);
            if (e.type === 'C')
                return "".concat(e.type, " ").concat(e.x1, " ").concat(e.y1 + asc, " ").concat(e.x2, " ").concat(e.y2 + asc, " ").concat(e.x, " ").concat(e.y + asc);
            if (e.type === 'Q')
                return "".concat(e.type, " ").concat(e.x1, " ").concat(e.y1 + asc, " ").concat(e.x, " ").concat(e.y + asc);
            if (e.type === 'Z')
                return 'Z';
            return '';
        }).join(' ');
        return { value: d };
    };
    for (var _i = 0, fontset_1 = fontset; _i < fontset_1.length; _i++) {
        var font = fontset_1[_i];
        var state_1 = _loop_1(font);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    console.warn("Glyph not found: ".concat(char));
    return null;
}
var discretizationCache = new Map();
function discretize(path) {
    if (discretizationCache.has(path))
        return discretizationCache.get(path);
    var loop = window.discretizeSvgPath(path).map(function (_a) {
        var x = _a[0], y = _a[1];
        return ({ x: x, y: y });
    });
    var dx = loop[0].x - loop[loop.length - 1].x;
    var dy = loop[0].y - loop[loop.length - 1].y;
    if (dx < 0.001 && dy < 0.001)
        loop.pop();
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
    var totalAng = 0;
    var angLog = [];
    for (var i = 0; i < loop.length; ++i) {
        var cur = loop[i];
        var prev = loop[(i - 1 + loop.length) % loop.length];
        var next = loop[(i + 1) % loop.length];
        var dx1 = cur.x - prev.x;
        var dy1 = cur.y - prev.y;
        var dx2 = next.x - cur.x;
        var dy2 = next.y - cur.y;
        var ang = Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
        if (ang > Math.PI)
            ang -= Math.PI * 2;
        if (ang < -Math.PI)
            ang += Math.PI * 2;
        totalAng += ang;
        angLog.push(ang);
    }
    var rot = totalAng / (Math.PI * 2);
    if (Math.abs(rot) > 1.01 || Math.abs(rot) < 0.99)
        console.error(rot, loop, angLog);
    if (rot < 0) { // However remember we're up-side down. This turns it into clockwise (in our view)
        loop.reverse();
    }
    discretizationCache.set(path, loop);
    return loop;
}
function applyMode(m) {
    if (m === 'darker') {
        ensureCanvas();
        rescanAt(document.body);
        // TODO: async reassemble
        reassemble();
        ensureObs();
        renderLoop();
    }
}
var mx = 0;
var my = 0;
function tracker(e) {
    mx = e.clientX;
    my = e.clientY;
}
function rescan(mutations, obs) {
    for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
        var m = mutations_1[_i];
        if (m.type === 'attributes')
            continue;
        if (m.type === 'characterData') {
            // TODO: rescan node
            console.log('Don\'t know how to rescan characterData');
            continue;
        }
        for (var _a = 0, _b = m.addedNodes; _a < _b.length; _a++) {
            var n = _b[_a];
            rescanAt(n);
        }
        reassemble();
    }
}
// TODO: allow scaning arbitrary HTML-side nodes
function rescanAt(el) {
    var _a;
    // Check if is svg
    if (el.tagName === 'svg') {
        rescanSVG(el);
        return;
    }
    if ((_a = el.classList) === null || _a === void 0 ? void 0 : _a.contains('label-status')) {
        var r = parseFloat(window.getComputedStyle(el).borderRadius.match(/^[0-9.]+/)[0]);
        var _b = el.getBoundingClientRect(), width = _b.width, height = _b.height;
        var d = "\n      M 0 ".concat(r, " A ").concat(r, " ").concat(r, " 0 0 1 ").concat(r, " 0\n      L ").concat(width - r, " 0 A ").concat(r, " ").concat(r, " 0 0 1 ").concat(width, " ").concat(r, "\n      L ").concat(width, " ").concat(height - r, " A ").concat(r, " ").concat(r, " 0 0 1 ").concat(width - r, " ").concat(height, "\n      L ").concat(r, " ").concat(height, " A ").concat(r, " ").concat(r, " 0 0 1 0 ").concat(height - r, "\n      z\n    ");
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svg.setAttribute('viewbox', "0 0 ".concat(width, " ").concat(height));
        svg.style.width = width + 'px';
        svg.style.height = height + 'px';
        svg.classList.add('darker-rounded-debug');
        var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', d);
        path.classList.add('darker-processed');
        path.classList.add('darker-surrogate');
        svg.appendChild(path);
        el.appendChild(svg);
        svg.classList.add('darker-traced');
        rescanAt(svg);
    }
    for (var _i = 0, _c = el.childNodes; _i < _c.length; _i++) {
        var child = _c[_i];
        if (child.nodeType === Node.TEXT_NODE) {
            var inner = child.nodeValue;
            if (!inner)
                continue;
            inner = inner.replace('\n', ' ');
            var wrapper = document.createElement('span');
            wrapper.classList.add('darker-text-group');
            var styles = window.getComputedStyle(el);
            var fs = styles.fontSize;
            var fsNum = parseFloat(fs.match(/^[0-9.]+/)[0]);
            var isBold = styles.fontWeight !== '400';
            while (inner !== '') {
                // Trim empty stuff
                var startTrim = inner.length - inner.trimStart().length;
                if (startTrim != 0) {
                    var startEmpty = inner.substring(0, startTrim);
                    var node = document.createElement('span');
                    node.classList.add('darker-text-empty');
                    node.innerText = ' ';
                    wrapper.appendChild(node);
                    inner = inner.trimStart();
                }
                else {
                    var first = inner.substring(0, 1);
                    inner = inner.substring(1);
                    var node = document.createElement('span');
                    node.classList.add('darker-text');
                    var holder = document.createElement('span');
                    holder.innerText = first;
                    node.appendChild(holder);
                    wrapper.appendChild(node);
                    // console.log(fsNum);
                    var glyph = resolveGlyph(first, fsNum, isBold);
                    if (!glyph)
                        continue;
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
        }
        else {
            // Skip processed elements
            if (el.classList.contains('darker-text-group'))
                continue;
            if (el.classList.contains('darker-text-svg'))
                continue;
            rescanAt(child);
        }
    }
}
var symbolCache = {};
var svgCache = {};
var svgIDGen = 0;
function splitPathSegs(path) {
    var d = path;
    var segs = [];
    while (true) {
        // console.log(d);
        var nextMoveIdx = d.substring(1).toLowerCase().indexOf('m');
        if (nextMoveIdx === -1) {
            segs.push(d);
            break;
        }
        segs.push(d.substring(0, nextMoveIdx + 1));
        d = d.substring(nextMoveIdx + 1);
    }
    var last = { x: 0, y: 0 };
    var paths = [];
    for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
        var seg = segs_1[_i];
        var _a = seg.match(/^[mM] *(-?[.0-9]+) *(-?[.0-9]+)/), firstMove = _a[0], mx_1 = _a[1], my_1 = _a[2];
        // console.log(firstMove);
        var d_1 = firstMove[0] === 'M' ? seg : "M ".concat(last.x + parseFloat(mx_1), " ").concat(last.y + parseFloat(my_1), " ").concat(seg.substring(firstMove.length));
        var path_1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path_1.setAttribute('d', d_1);
        path_1.classList.add('darker-processed');
        path_1.classList.add('darker-surrogate');
        last = path_1.getPointAtLength(path_1.getTotalLength());
        paths.push([path_1, new Path2D(d_1)]);
    }
    var tmpCtx = document.createElement('canvas').getContext('2d');
    var outerPaths = [];
    for (var _b = 0, paths_1 = paths; _b < paths_1.length; _b++) {
        var _c = paths_1[_b], path_2 = _c[0], _ = _c[1];
        var starting = path_2.getPointAtLength(0);
        var outer = true;
        for (var _d = 0, paths_2 = paths; _d < paths_2.length; _d++) {
            var _e = paths_2[_d], another = _e[0], repr = _e[1];
            if (another !== path_2) {
                if (tmpCtx.isPointInPath(repr, starting.x, starting.y)) {
                    outer = false;
                    break;
                }
            }
        }
        if (outer)
            outerPaths.push(path_2);
    }
    return outerPaths;
}
// TODO: cache DOM
function rescanSVG(el) {
    var _a;
    if (el.classList.contains('darker-processed'))
        return;
    if (el.tagName === 'path') {
        var d = (_a = el.getAttribute('d')) !== null && _a !== void 0 ? _a : '';
        var segs = splitPathSegs(d);
        for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
            var path = segs_2[_i];
            el.parentNode.appendChild(path);
        }
    }
    else if (el.tagName === 'use') {
        el.classList.add('darker-traced');
        // const xlink = el.getAttribute('xlink:href');
    }
    // TODO: trace texts
    for (var _b = 0, _c = el.children; _b < _c.length; _b++) {
        var child = _c[_b];
        rescanSVG(child);
    }
    if (el.tagName === 'symbol' && el.id !== '') {
        // Cache symbol content
        var allPaths = el.querySelectorAll(".darker-surrogate");
        var ret = [];
        for (var _d = 0, allPaths_1 = allPaths; _d < allPaths_1.length; _d++) {
            var p = allPaths_1[_d];
            ret.push(p.getAttribute('d'));
        }
        symbolCache[el.id] = ret;
    }
    else if (el.tagName === 'svg' && el.getAttribute('display') !== 'none') {
        var id = svgIDGen++;
        el.id = "darker-svg-".concat(id);
        var allPaths = el.querySelectorAll(".darker-surrogate");
        var ret = [];
        for (var _e = 0, allPaths_2 = allPaths; _e < allPaths_2.length; _e++) {
            var p = allPaths_2[_e];
            ret.push(p.getAttribute('d'));
        }
        svgCache[el.id] = ret;
    }
    el.classList.add('darker-processed');
}
var obs = null;
var canvas = null;
var backdrop = null;
var overlay = null;
var shaderCtx = {
    a_pos: null,
    u_screen_loc: null,
    u_mouse_loc: null,
    u_offset_loc: null,
    triangleCnt: 0,
    gl: null,
};
function ensureCanvas() {
    var container = document.createElement('div');
    container.classList.add('darker-canvases');
    if (backdrop === null) {
        backdrop = document.createElement('canvas');
        container.appendChild(backdrop);
    }
    if (canvas === null) {
        canvas = document.createElement('canvas');
        canvas.classList.add('darker-canvas');
        container.appendChild(canvas);
        var gl = canvas.getContext('webgl');
        if (!gl) {
            alert('WebGL Missing!');
            return;
        }
        shaderCtx.gl = gl;
        var vertShader = gl.createShader(gl.VERTEX_SHADER);
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertShader, vertShaderSrc);
        gl.shaderSource(fragShader, fragShaderSrc);
        gl.compileShader(vertShader);
        console.log(gl.getShaderInfoLog(vertShader));
        gl.compileShader(fragShader);
        console.log(gl.getShaderInfoLog(fragShader));
        // TODO: check compile status
        var prog = gl.createProgram();
        gl.attachShader(prog, vertShader);
        gl.attachShader(prog, fragShader);
        gl.linkProgram(prog);
        var a_pos_loc = gl.getAttribLocation(prog, 'a_pos');
        shaderCtx.a_pos = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, shaderCtx.a_pos);
        gl.useProgram(prog);
        gl.enableVertexAttribArray(a_pos_loc);
        gl.vertexAttribPointer(a_pos_loc, 3, gl.FLOAT, false, 0, 0);
        shaderCtx.u_screen_loc = gl.getUniformLocation(prog, 'u_screen');
        shaderCtx.u_mouse_loc = gl.getUniformLocation(prog, 'u_mouse');
        shaderCtx.u_offset_loc = gl.getUniformLocation(prog, 'u_offset');
    }
    if (overlay === null) {
        overlay = document.createElement('canvas');
        container.appendChild(overlay);
    }
    document.body.appendChild(container);
}
function ensureObs() {
    if (obs === null) {
        obs = new MutationObserver(rescan);
        obs.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}
var textCache = new WeakMap();
function reassemble() {
    var traced = document.getElementsByClassName('darker-traced');
    var assembledBuffer = [];
    var trig = 0;
    function assemblePath(paths, sx, sy, scale) {
        for (var _i = 0, paths_3 = paths; _i < paths_3.length; _i++) {
            var path = paths_3[_i];
            var dpath = discretize(path);
            if (dpath.length === 1)
                continue;
            for (var i = 0; i < dpath.length; ++i) {
                var cx = dpath[i].x * scale + sx;
                var cy = dpath[i].y * scale + sy;
                var nx = dpath[(i + 1) % dpath.length].x * scale + sx;
                var ny = dpath[(i + 1) % dpath.length].y * scale + sy;
                // Expand a little bit
                assembledBuffer.push(cx, cy, 0, nx, ny, 0, cx, cy, 100, cx, cy, 100, nx, ny, 100, nx, ny, 0);
                trig += 2;
            }
        }
    }
    for (var _i = 0, traced_1 = traced; _i < traced_1.length; _i++) {
        var trace = traced_1[_i];
        var _a = trace.getBoundingClientRect(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var scale = 1;
        if (trace.tagName === 'use') {
            var sym = document.getElementById(trace.getAttribute('xlink:href').substring(1));
            var vbox = sym.viewBox.baseVal;
            // TODO: handle browsers without baseVal
            // TODO: handle origins other than 0,0
            var scale_1 = width / vbox.width;
            var vscale = height / vbox.height;
            // if(scale > vscale * 1.01 || scale < vscale * 0.99)
            //   console.warn(`incompatible scales: ${scale}, ${vscale}`);
            var paths = symbolCache[sym.id];
            if (paths === undefined) {
                console.warn("Symbol not in cache: ".concat(sym.id));
                continue;
            }
            assemblePath(paths, x, y + window.scrollY, scale_1);
        }
        else if (trace.tagName === 'svg') {
            var paths = svgCache[trace.id];
            if (paths === undefined) {
                console.warn("SVG not in cache: ".concat(trace.id));
                continue;
            }
            assemblePath(paths, x, y + window.scrollY, scale);
        }
        else if (trace.classList.contains('darker-text')) {
            var cached = textCache.get(trace);
            if (!cached) {
                var glyph = trace.getAttribute('data-glyph');
                var paths = splitPathSegs(glyph);
                cached = paths.map(function (e) { return e.getAttribute('d'); });
                textCache.set(trace, cached);
            }
            assemblePath(cached, x, y + window.scrollY, scale);
        }
    }
    // TODO: error on me
    if (!shaderCtx.gl)
        return;
    shaderCtx.gl.bufferData(shaderCtx.gl.ARRAY_BUFFER, new Float32Array(assembledBuffer), shaderCtx.gl.STATIC_DRAW);
    shaderCtx.triangleCnt = trig * 3;
}
var renderStopped = false;
function renderLoop() {
    if (!canvas || !backdrop || !overlay || !shaderCtx.gl)
        return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    {
        backdrop.width = window.innerWidth;
        backdrop.height = window.innerHeight;
        var ctx = backdrop.getContext('2d');
        var grad = ctx.createRadialGradient(mx, my, 100, mx, my, 600);
        grad.addColorStop(0, "#333");
        grad.addColorStop(1, "#111");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, backdrop.width, backdrop.height);
    }
    var gl = shaderCtx.gl;
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
        var ctx = overlay.getContext('2d');
        var grad = ctx.createRadialGradient(mx, my, 40, mx, my, 60);
        grad.addColorStop(0, "rgba(255,255,255,0.4)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, overlay.width, overlay.height);
    }
    requestAnimationFrame(renderLoop);
}
document.addEventListener('DOMContentLoaded', function () {
    var dark = document.getElementsByClassName('dark-switch-inner')[0];
    dark.addEventListener('click', function () {
        var parent = dark.parentNode;
        var cur = parent.getAttribute("data-mode");
        var idx = (modes.findIndex(function (e) { return e === cur; }) + 1) % modes.length;
        var next = modes[idx];
        applyMode(next);
        parent.setAttribute('data-mode', next);
    });
    document.addEventListener('mousemove', tracker);
});
