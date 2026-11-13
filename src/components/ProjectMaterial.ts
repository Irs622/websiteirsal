export const MATERIAL_PALETTES = [
  ['#9aa79f', '#bdced0', '#e5d8c6'],
  ['#94a7ba', '#b8c6df', '#e6d8d3'],
  ['#b8bab5', '#c2d2d8', '#ead8ca'],
  ['#b3a2bd', '#aec8df', '#ebc9d7'],
  ['#b9b09f', '#c9d0bc', '#edd9c3'],
  ['#92b2ab', '#b2cdd5', '#e2dfbf'],
  ['#929daf', '#bfc5da', '#e3d8cd']
];
const VERTEX = `attribute vec2 aPosition;
varying vec2 vUv;
void main() { vUv = aPosition * .5 + .5; gl_Position = vec4(aPosition, 0., 1.); }`;
const FRAGMENT = `precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uScroll;
uniform float uSeed;
uniform vec3 uBase;
uniform vec3 uCool;
uniform vec3 uWarm;
float surface(vec2 p) {
  float t = uTime * .075;
  p += vec2(uSeed * .91, uSeed * .37);
  vec2 q = p + vec2(.36 * sin(p.y * 1.7 + t), .25 * sin(p.x * 1.8 - t * .7));
  float f = q.x * 2.9 + q.y * .65 + 1.1 * sin(q.y * 1.8 + t * .45);
  return .26 * sin(f) + .085 * sin(f * 2.35 + .6 * sin(q.y * 2.1)) + .15 * sin(q.y * 1.7 + q.x * .45 - t * .65);
}
void main() {
  vec2 p = (vUv - .5) * vec2(uResolution.x / uResolution.y, 1.) * 3.1;
  p += uPointer * .055 + vec2(.035, .12) * uScroll;
  float e = .002;
  float h = surface(p);
  vec2 slope = vec2(surface(p + vec2(e, 0.)) - surface(p - vec2(e, 0.)), surface(p + vec2(0., e)) - surface(p - vec2(0., e))) / (2. * e);
  vec3 n = normalize(vec3(-slope * 1.25, 1.));
  vec3 reflection = reflect(vec3(0., 0., -1.), n);
  vec3 lamp = normalize(vec3(.35 + uPointer.x * .22, .65 + uPointer.y * .18, 1.));
  float diffuse = max(dot(n, lamp), 0.);
  float pearl = .5 + .5 * sin(reflection.x * 3.2 + reflection.y * 2.4 + h * 4. + uSeed);
  vec3 tint = mix(uCool, uWarm, pearl);
  vec3 body = mix(uBase, tint, .56) * (.59 + .34 * diffuse);
  float window = exp(-pow((reflection.x + reflection.y * .28 - .12) * 3.8, 2.));
  float edge = exp(-pow((reflection.x - reflection.y * .14 + .57) * 17., 2.));
  float dark = exp(-pow((reflection.x - .66) * 8., 2.));
  vec3 color = mix(body, vec3(.985, .98, .96), window * .83);
  color += edge * vec3(.23, .22, .20);
  color *= 1. - dark * .38;
  color += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 255.;
  gl_FragColor = vec4(pow(clamp(color, 0., 1.), vec3(.96)), 1.);
}`;
const rgb = (hex: string) => [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255);
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** One small context per mounted preview, initialized only when visible.
 * Only uncovered previews animate; capped at 30 fps and 1.25 device ratio.
 * The SVG underneath remains available if WebGL fails or the context is lost.
 */
export function mountProjectMaterial(canvas: HTMLCanvasElement, root: HTMLElement, index: number): () => void {
  const link = root.closest<HTMLElement>('.work-cover');
  if (!link) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const colors = MATERIAL_PALETTES[index % MATERIAL_PALETTES.length];
  let gl: WebGLRenderingContext | null = null;
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let shaders: WebGLShader[] = [];
  let uniforms: Record<string, WebGLUniformLocation | null> = {};
  let visible = false;
  let active = false;
  let lost = false;
  let failed = false;
  let frame = 0;
  let lastPaint = 0;
  let time = 0;
  let scroll = 0;
  let scrollTarget = 0;
  let pointer = [0, 0];
  let pointerTarget = [0, 0];

  const dispose = () => {
    if (gl) {
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach(shader => gl?.deleteShader(shader));
    }
    program = null; buffer = null; shaders = [];
  };
  const initialize = () => {
    if (program) return true;
    if (lost || failed) return false;
    try {
      gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power', preserveDrawingBuffer: false });
      if (!gl) { failed = true; return false; }
      const compile = (type: number, source: string) => {
        const shader = gl!.createShader(type);
        if (!shader) throw new Error('Material shader unavailable');
        shaders.push(shader);
        gl!.shaderSource(shader, source); gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) throw new Error('Material shader unsupported');
        return shader;
      };
      const vertex = compile(gl.VERTEX_SHADER, VERTEX);
      const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
      program = gl.createProgram();
      if (!program) throw new Error('Material program unavailable');
      gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Material program unsupported');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      if (!buffer) throw new Error('Material buffer unavailable');
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(['uResolution', 'uTime', 'uPointer', 'uScroll', 'uSeed', 'uBase', 'uCool', 'uWarm'].map(name => [name, gl!.getUniformLocation(program!, name)]));
      gl.uniform1f(uniforms.uSeed, index * 1.37);
      gl.uniform3fv(uniforms.uBase, rgb(colors[0]));
      gl.uniform3fv(uniforms.uCool, rgb(colors[1]));
      gl.uniform3fv(uniforms.uWarm, rgb(colors[2]));
      return true;
    } catch {
      failed = true; dispose();
      return false;
    }
  };
  const draw = () => {
    if (!initialize() || !gl) return;
    const ratio = Math.min(devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.round(root.clientWidth * ratio));
    const height = Math.max(1, Math.round(root.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uniforms.uResolution, width, height);
    gl.uniform1f(uniforms.uTime, time);
    gl.uniform2f(uniforms.uPointer, pointer[0], pointer[1]);
    gl.uniform1f(uniforms.uScroll, scroll);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    root.dataset.renderer = 'webgl';
    root.dataset.motionTime = time.toFixed(3);
    root.dataset.lightX = pointer[0].toFixed(3);
  };
  const stop = () => {
    cancelAnimationFrame(frame); frame = 0; lastPaint = 0;
    root.dataset.running = 'false';
  };
  const tick = (now: number) => {
    frame = 0;
    if (!active || reduced.matches || document.hidden || failed || lost) { stop(); return; }
    if (!lastPaint || now - lastPaint >= 1000 / 30) {
      const dt = lastPaint ? Math.min((now - lastPaint) / 1000, .06) : 1 / 30;
      lastPaint = now;
      time += dt;
      const follow = 1 - Math.exp(-dt / .28);
      pointer = pointer.map((value, i) => value + (pointerTarget[i] - value) * follow);
      scroll += (scrollTarget - scroll) * follow;
      draw();
    }
    root.dataset.running = 'true';
    frame = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (!visible || document.hidden || lost) { active = false; stop(); return; }
    const box = root.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = clamp(box.top + box.height / 2, 78, innerHeight - 12);
    const hit = document.elementFromPoint(x, y);
    active = y >= box.top && y <= box.bottom && hit?.closest('.work-cover') === link;
    if (!active) { stop(); return; }
    scrollTarget = clamp((innerHeight * .5 - box.top) / innerHeight, -1, 1);
    if (reduced.matches) { stop(); pointer = [0, 0]; scroll = 0; time = 0; draw(); }
    else if (!frame && !failed) { lastPaint = 0; frame = requestAnimationFrame(tick); }
  };
  const intersection = new IntersectionObserver(entries => {
    const entry = entries[entries.length - 1];
    visible = entry.isIntersecting && entry.intersectionRatio > 0;
    wake();
  });
  const resize = new ResizeObserver(() => { if (active) draw(); wake(); });
  const move = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || reduced.matches) return;
    const box = root.getBoundingClientRect();
    pointerTarget = [clamp((event.clientX - box.left) / box.width * 2 - 1, -1, 1), clamp(1 - (event.clientY - box.top) / box.height * 2, -1, 1)];
  };
  const leave = () => { pointerTarget = [0, 0]; };
  const focus = () => { if (!reduced.matches) pointerTarget = [.3, .15]; wake(); };
  const contextLost = (event: Event) => { event.preventDefault(); lost = true; stop(); dispose(); root.dataset.renderer = 'fallback'; };
  const contextRestored = () => { lost = false; failed = false; wake(); };
  intersection.observe(root); resize.observe(root);
  link.addEventListener('pointermove', move); link.addEventListener('pointerleave', leave);
  link.addEventListener('focus', focus); link.addEventListener('blur', leave);
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', wake);
  document.addEventListener('visibilitychange', wake);
  reduced.addEventListener('change', wake);
  canvas.addEventListener('webglcontextlost', contextLost);
  canvas.addEventListener('webglcontextrestored', contextRestored);
  return () => {
    stop(); intersection.disconnect(); resize.disconnect();
    link.removeEventListener('pointermove', move); link.removeEventListener('pointerleave', leave);
    link.removeEventListener('focus', focus); link.removeEventListener('blur', leave);
    window.removeEventListener('scroll', wake); window.removeEventListener('resize', wake);
    document.removeEventListener('visibilitychange', wake); reduced.removeEventListener('change', wake);
    canvas.removeEventListener('webglcontextlost', contextLost); canvas.removeEventListener('webglcontextrestored', contextRestored);
    dispose(); gl?.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
