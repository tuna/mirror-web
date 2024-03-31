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
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    modes[0] = 'dark';
    modes[1] = 'light';
    var toggle = document.getElementsByClassName('dark-switch')[0];
    toggle.setAttribute('data-mode', 'dark');
}
var tmpCtx = document.createElement('canvas').getContext('2d');
var vertShaderSrc = "\nattribute vec4 a_pos;\nuniform vec2 u_screen;\nuniform vec2 u_mouse;\nuniform vec2 u_offset;\n\nvarying float v_opacity;\n\nvoid main() {\n  vec2 pos_screen = a_pos.xy + u_offset;\n  vec2 pos_translated;\n  vec2 diff = pos_screen - u_mouse;\n  pos_translated.x = pos_screen.x + diff.x * a_pos.z;\n  pos_translated.y = pos_screen.y + diff.y * a_pos.z;\n  gl_Position.x = pos_translated.x / u_screen.x * 2.0 - 1.0;\n  gl_Position.y = - (pos_translated.y / u_screen.y * 2.0 - 1.0);\n  gl_Position.z = 0.0;\n  gl_Position.w = 1.0;\n\n  if(a_pos.z > 0.0) {\n    v_opacity = 0.0;\n  } else {\n    float dist = sqrt(diff.x * diff.x + diff.y * diff.y);\n    // 30 - 50px\n    v_opacity = clamp((dist - 30.0) / 20.0, 0.0, 1.0);\n  }\n}\n";
var fragShaderSrc = "\nprecision mediump float;\nvarying float v_opacity;\n\nvoid main() {\n  gl_FragColor = vec4(0.0, 0.0, 0.0, v_opacity);\n}\n";
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
var staticPathSet;
var staticEls = [];
var tmpPathSets = new Map();
var tmpPathKeys = [];
function ratify(ps) {
    if (shaderCtx.gl === null)
        throw new Error('WebGL not initialized!');
    var gl = shaderCtx.gl;
    var ext = gl.getExtension("OES_vertex_array_object");
    var vao = ext.createVertexArrayOES();
    ext.bindVertexArrayOES(vao);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, ps, gl.DYNAMIC_DRAW);
    var a_pos_loc = gl.getAttribLocation(shaderCtx.prog, 'a_pos');
    gl.enableVertexAttribArray(a_pos_loc);
    gl.vertexAttribPointer(a_pos_loc, 3, gl.FLOAT, false, 0, 0);
    ext.bindVertexArrayOES(null);
    gl.deleteBuffer(buf);
    return [vao, ps.length / 3];
}
function free(ps) {
    if (!ps)
        return;
    if (shaderCtx.gl === null)
        throw new Error('WebGL not initialized!');
    var gl = shaderCtx.gl;
    var ext = gl.getExtension("OES_vertex_array_object");
    ext.deleteVertexArrayOES(ps[0]);
}
function applyMode(m) {
    return __awaiter(this, void 0, void 0, function () {
        var tmpl_1, flames_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    document.body.parentElement.classList.remove('forced-light');
                    document.body.parentElement.classList.remove('forced-dark');
                    if (!(m === 'light' || m === 'dark')) return [3 /*break*/, 1];
                    document.body.parentElement.classList.add("forced-".concat(m));
                    return [3 /*break*/, 4];
                case 1:
                    if (!(m === 'darker')) return [3 /*break*/, 3];
                    document.body.parentElement.classList.add('forced-light');
                    document.body.classList.add('darker-engaging');
                    return [4 /*yield*/, allFonts];
                case 2:
                    _a.sent();
                    setTimeout(function () {
                        ensureCanvas();
                        staticEls = rescan(document.body);
                        // TODO: async reassemble
                        staticPathSet = ratify(assembleAll(staticEls));
                        ensureObs();
                        renderLoop();
                        document.body.classList.remove('darker-engaging');
                    }, 100);
                    return [3 /*break*/, 4];
                case 3:
                    tmpl_1 = document.querySelector('.dark-switch-icon[data-active="lighter"] svg').cloneNode(true);
                    flames_1 = document.querySelector('.flames');
                    renderStopped = true;
                    document.body.classList.add('darker-cleanup');
                    setTimeout(function () {
                        document.body.addEventListener('click', function (e) {
                            e.target.remove();
                            e.preventDefault();
                            var inserted = tmpl_1.cloneNode(true);
                            inserted.style.top = e.pageY + 'px';
                            inserted.style.left = e.pageX + 'px';
                            flames_1.appendChild(inserted);
                        });
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var mx = 0;
var my = 0;
function tracker(e) {
    mx = e.clientX;
    my = e.clientY;
}
function onMutate(mutations, obs) {
    for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
        var m = mutations_1[_i];
        if (m.type === 'attributes')
            continue;
        if (m.type === 'characterData') {
            console.log('Don\'t know how to rescan characterData');
            continue;
        }
        for (var _a = 0, _b = m.addedNodes; _a < _b.length; _a++) {
            var n = _b[_a];
            // Skip elements added by ourselves
            if (!n.classList.contains('popover'))
                continue;
            var els = rescan(n);
            // Based on n
            var ps = assembleAll(els);
            tmpPathSets.set(n, ratify(ps));
            tmpPathKeys.push(n);
        }
        for (var _c = 0, _d = m.removedNodes; _c < _d.length; _c++) {
            var n = _d[_c];
            var orig = tmpPathSets.get(n);
            if (orig)
                free(orig);
            tmpPathSets.delete(n);
        }
    }
}
function rescan(el) {
    var buf = [];
    rescanAt(el, buf);
    return buf;
}
// TODO: allow scaning arbitrary HTML-side nodes
function rescanAt(el, buf) {
    var _a, _b, _c, _d, _e, _f, _g;
    if ((_a = el.classList) === null || _a === void 0 ? void 0 : _a.contains('sr-only'))
        return;
    if ((_b = el.classList) === null || _b === void 0 ? void 0 : _b.contains('dark-switch-hint'))
        return;
    // Check if is svg
    if (el.tagName === 'svg') {
        rescanSVG(el, buf, []);
        return;
    }
    if (((_c = el.classList) === null || _c === void 0 ? void 0 : _c.contains('label-status')) || ((_d = el.classList) === null || _d === void 0 ? void 0 : _d.contains('label-new')) || ((_e = el.classList) === null || _e === void 0 ? void 0 : _e.contains('input-wrapper')) || ((_f = el.classList) === null || _f === void 0 ? void 0 : _f.contains('popover'))) {
        var isPopover = (_g = el.classList) === null || _g === void 0 ? void 0 : _g.contains('popover');
        var r = parseFloat(window.getComputedStyle(el).borderRadius.match(/^[0-9.]+/)[0]);
        var _h = el.getBoundingClientRect(), width = _h.width, height = _h.height;
        var d = "\n      M 0 ".concat(r, " A ").concat(r, " ").concat(r, " 0 0 1 ").concat(r, " 0\n      L ").concat(width - r, " 0 A ").concat(r, " ").concat(r, " 0 0 1 ").concat(width, " ").concat(r, "\n      L ").concat(width, " ").concat(height - r, " A ").concat(r, " ").concat(r, " 0 0 1 ").concat(width - r, " ").concat(height, "\n      L ").concat(r, " ").concat(height, " A ").concat(r, " ").concat(r, " 0 0 1 0 ").concat(height - r, "\n      ").concat(isPopover ? "L 0 ".concat(height / 2 + 10, " L -10 ").concat(height / 2, " L 0 ").concat(height / 2 - 10) : '', " \n      z\n    ");
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svg.setAttribute('viewbox', "0 0 ".concat(width, " ").concat(height));
        svg.style.width = width + 'px';
        svg.style.height = height + 'px';
        svg.classList.add('darker-rounded-surrogate');
        var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', d);
        svg.appendChild(path);
        el.appendChild(svg);
    }
    for (var _i = 0, _j = el.childNodes; _i < _j.length; _i++) {
        var child = _j[_i];
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
                    // node.classList.add('darker-traced');
                    buf.push(node);
                    var paths = splitPathSegs(glyph);
                    textCache.set(node, paths);
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
            rescanAt(child, buf);
        }
    }
}
var symbolCache = {};
var svgCache = {};
var svgIDGen = 0;
// FIXME: return string instead
function splitPathSegs(path) {
    var d = path.trim();
    var segs = [];
    while (true) {
        var nextMoveIdx = d.substring(1).toLowerCase().indexOf('m');
        if (nextMoveIdx === -1) {
            segs.push(d);
            break;
        }
        segs.push(d.substring(0, nextMoveIdx + 1));
        d = d.substring(nextMoveIdx + 1).trim();
    }
    var last = { x: 0, y: 0 };
    var paths = [];
    for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
        var seg = segs_1[_i];
        var _a = seg.match(/^[mM] *(-?[.0-9]+) *(-?[.0-9]+)/), firstMove = _a[0], mx_1 = _a[1], my_1 = _a[2];
        // console.log(firstMove);
        var bx = firstMove[0] === 'M' ? parseFloat(mx_1) : last.x + parseFloat(mx_1);
        var by = firstMove[0] === 'M' ? parseFloat(my_1) : last.y + parseFloat(my_1);
        var d_1 = "M ".concat(bx, " ").concat(by, " ").concat(seg.substring(firstMove.length).trim());
        var path_1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path_1.setAttribute('d', d_1);
        path_1.classList.add('darker-processed');
        path_1.classList.add('darker-surrogate');
        if (d_1[d_1.length - 1] === 'z' || d_1[d_1.length - 1] === 'Z') {
            last = { x: bx, y: by };
        }
        else {
            console.error("Cannot find path end: ".concat(d_1));
            last = { x: bx, y: by };
        }
        paths.push([path_1, { x: bx, y: by }, new Path2D(d_1), d_1]);
    }
    var outerPaths = [];
    for (var _b = 0, paths_1 = paths; _b < paths_1.length; _b++) {
        var _c = paths_1[_b], path_2 = _c[0], starting = _c[1], _ = _c[2], ret = _c[3];
        var outer = true;
        for (var _d = 0, paths_2 = paths; _d < paths_2.length; _d++) {
            var _e = paths_2[_d], another = _e[0], _1 = _e[1], repr = _e[2];
            if (another !== path_2) {
                if (tmpCtx.isPointInPath(repr, starting.x, starting.y)) {
                    outer = false;
                    break;
                }
            }
        }
        if (outer)
            outerPaths.push(ret);
    }
    return outerPaths;
}
// TODO: cache DOM
function rescanSVG(el, buf, pathCollector) {
    var _a;
    if (el.tagName === 'path') {
        var d = (_a = el.getAttribute('d')) === null || _a === void 0 ? void 0 : _a.trim();
        try {
            var segs = splitPathSegs(d);
            pathCollector.push.apply(pathCollector, segs);
        }
        catch (e) {
            console.error(e);
            console.log(el);
        }
    }
    else if (el.tagName === 'use') {
        buf.push(el);
        // el.classList.add('darker-traced');
        // const xlink = el.getAttribute('xlink:href');
    }
    var childPathCollector = pathCollector;
    if (el.tagName === 'symbol' && el.id !== '') {
        childPathCollector = [];
    }
    else if (el.tagName === 'svg' && el.getAttribute('display') !== 'none') {
        childPathCollector = [];
    }
    for (var _i = 0, _b = el.children; _i < _b.length; _i++) {
        var child = _b[_i];
        rescanSVG(child, buf, childPathCollector);
    }
    if (el.tagName === 'symbol' && el.id !== '') {
        // Cache symbol content
        symbolCache[el.id] = childPathCollector;
    }
    else if (el.tagName === 'svg' && el.getAttribute('display') !== 'none') {
        var id = svgIDGen++;
        el.id = "darker-svg-".concat(id);
        // console.log(el.id, childPathCollector)
        svgCache[el.id] = childPathCollector;
        buf.push(el);
    }
    // TODO: Do we need to join childPathCollector to pathCollector if there are not eq?
}
var obs = null;
var canvas = null;
var onscreen = null;
var shaderCtx = {
    u_screen_loc: null,
    u_mouse_loc: null,
    u_offset_loc: null,
    gl: null,
    prog: null,
};
function ensureCanvas() {
    var container = document.createElement('div');
    container.classList.add('darker-canvases');
    if (onscreen === null) {
        onscreen = document.createElement('canvas');
        container.appendChild(onscreen);
    }
    if (canvas === null) {
        canvas = document.createElement('canvas');
        // canvas.classList.add('darker-canvas');
        // container.appendChild(canvas);
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
        shaderCtx.prog = prog;
        gl.attachShader(prog, vertShader);
        gl.attachShader(prog, fragShader);
        gl.linkProgram(prog);
        gl.useProgram(prog);
        shaderCtx.u_screen_loc = gl.getUniformLocation(prog, 'u_screen');
        shaderCtx.u_mouse_loc = gl.getUniformLocation(prog, 'u_mouse');
        shaderCtx.u_offset_loc = gl.getUniformLocation(prog, 'u_offset');
    }
    document.body.appendChild(container);
}
function ensureObs() {
    if (obs === null) {
        obs = new MutationObserver(onMutate);
        obs.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}
// Assembly
var textCache = new WeakMap();
// TODO: segmentation
function assemblePath(paths, sx, sy, scale) {
    var buf = [];
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
            buf.push(cx, cy, -0.01, nx, ny, -0.01, cx, cy, 5, cx, cy, 5, nx, ny, 5, nx, ny, -0.01);
        }
    }
    return buf;
}
function assembleOne(el, buffer) {
    if (el.getAttribute('display') === 'none')
        return;
    var _a = el.getBoundingClientRect(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var populated = [];
    if (el.tagName === 'use') {
        var sym = document.getElementById(el.getAttribute('xlink:href').substring(1));
        var vbox = sym.viewBox.baseVal;
        // TODO: handle browsers without baseVal
        // TODO: handle origins other than 0,0
        // Firefox fucks up its dimension calculation
        var parentDims = el.parentElement.getBoundingClientRect();
        var scale = parentDims.width / vbox.width;
        var vscale = parentDims.height / vbox.height;
        // if(scale > vscale * 1.01 || scale < vscale * 0.99)
        //   console.warn(`incompatible scales: ${scale}, ${vscale}`);
        var paths = symbolCache[sym.id];
        if (paths === undefined) {
            console.warn("Symbol not in cache: ".concat(sym.id));
            return;
        }
        populated = assemblePath(paths, x, y + window.scrollY, scale);
    }
    else if (el.tagName === 'svg') {
        var scale = 1;
        var vb = el.getAttribute('viewBox');
        if (vb) {
            var _b = vb.split(' ').map(function (e) { return parseFloat(e); }), _ = _b[0], __ = _b[1], vboxw = _b[2], vboxh = _b[3];
            scale = width / vboxw;
        }
        var paths = svgCache[el.id];
        if (paths === undefined) {
            console.warn("SVG not in cache: ".concat(el.id));
            return;
        }
        populated = assemblePath(paths, x, y + window.scrollY, scale);
    }
    else if (el.classList.contains('darker-text')) {
        var cached = textCache.get(el);
        if (!cached) {
            console.warn("Text not in cache: ".concat(el.id));
            return;
        }
        populated = assemblePath(cached, x, y + window.scrollY, 1);
    }
    buffer.push.apply(buffer, populated);
}
function assembleAll(els) {
    var buf = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        assembleOne(el, buf);
    }
    return new Float32Array(buf);
}
var renderStopped = false;
var lastRecordedSearch = '';
function renderLoop() {
    var _a;
    if (renderStopped)
        return;
    if (!canvas || !onscreen || !shaderCtx.gl)
        return;
    var search = document.getElementById('search');
    if (search && search.value !== lastRecordedSearch) {
        lastRecordedSearch = search.value;
        setTimeout(function () {
            free(staticPathSet);
            staticPathSet = ratify(assembleAll(staticEls));
        }, 10);
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
    var ext = gl.getExtension("OES_vertex_array_object");
    function drawPathSet(ps) {
        ext.bindVertexArrayOES(ps[0]);
        gl.drawArrays(gl.TRIANGLES, 0, ps[1]);
    }
    drawPathSet(staticPathSet);
    for (var _i = 0, tmpPathKeys_1 = tmpPathKeys; _i < tmpPathKeys_1.length; _i++) {
        var k = tmpPathKeys_1[_i];
        if (!document.contains(k))
            tmpPathSets.delete(k);
        else {
            var lookup = tmpPathSets.get(k);
            if (lookup)
                drawPathSet(lookup);
        }
    }
    {
        onscreen.width = window.innerWidth;
        onscreen.height = window.innerHeight;
        var ctx = onscreen.getContext('2d');
        var bggrad = ctx.createRadialGradient(mx, my, 100, mx, my, 600);
        bggrad.addColorStop(0, "#333");
        bggrad.addColorStop(1, "#111");
        ctx.fillStyle = bggrad;
        ctx.fillRect(0, 0, onscreen.width, onscreen.height);
        if (((_a = document.getElementById('isoModal')) === null || _a === void 0 ? void 0 : _a.style.display) !== 'block')
            ctx.drawImage(canvas, 0, 0);
        var fggrad = ctx.createRadialGradient(mx, my, 40, mx, my, 60);
        fggrad.addColorStop(0, "rgba(255,255,255,0.4)");
        fggrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = fggrad;
        ctx.fillRect(0, 0, onscreen.width, onscreen.height);
    }
    requestAnimationFrame(renderLoop);
}
document.addEventListener('DOMContentLoaded', function () {
    var dark = document.getElementsByClassName('dark-switch-inner')[0];
    var hint = document.querySelector('.dark-switch-hint');
    dark.addEventListener('click', function () {
        hint === null || hint === void 0 ? void 0 : hint.classList.add('dark-switch-hint-ack');
        window.localStorage.setItem('2024-april-fools', 'meow');
        var parent = dark.parentNode;
        var cur = parent.getAttribute("data-mode");
        if (cur === 'lighter')
            return;
        var idx = (modes.findIndex(function (e) { return e === cur; }) + 1) % modes.length;
        var next = modes[idx];
        applyMode(next);
        parent.setAttribute('data-mode', next);
    });
    if (hint) {
        hint.addEventListener('click', function (e) {
            hint.classList.add('dark-switch-hint-ack');
            window.localStorage.setItem('2024-april-fools', 'meow');
        });
        if (window.localStorage.getItem('2024-april-fools') === null)
            hint.classList.remove('dark-switch-hint-ack');
    }
    document.addEventListener('mousemove', tracker);
});
