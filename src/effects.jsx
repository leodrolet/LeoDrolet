/* ============================================================
   effects.jsx — Hero WebGL-ish scene + reveal hooks + nav scroll
   ============================================================ */

/**
 * Scroll-triggered reveal hook
 * Adds `.in` class to the element when it enters viewport.
 */
const useReveal = (deps = []) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, deps);
  return ref;
};

/**
 * Wraps each word of `text` in a span with class `word`.
 * Applies stagger via inline transition-delay.
 */
const WordReveal = ({ text, className = "", initialDelay = 0, perWordDelay = 60, wordClass = "" }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const words = el.querySelectorAll(".word");
          words.forEach((w, i) => {
            setTimeout(() => w.classList.add("in"), initialDelay + i * perWordDelay);
          });
          io.unobserve(el);
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [text, initialDelay, perWordDelay]);

  // Parse text: tokens wrapped in *italic* / **accent**
  const parts = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\S+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const t = m[1];
    if (t.startsWith("**")) parts.push({ kind: "accent", text: t.slice(2, -2) });
    else if (t.startsWith("*")) parts.push({ kind: "italic", text: t.slice(1, -1) });
    else parts.push({ kind: "plain", text: t });
  }
  return (
    <span ref={ref} className={className}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span className={`word ${wordClass} ${p.kind === "italic" ? "italic" : ""} ${p.kind === "accent" ? "accent" : ""}`}>{p.text}</span>
          {i < parts.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
};

/**
 * HeroCanvas — abstract WebGL-feel scene done in 2D canvas:
 *   - Wireframe icosahedron, perspective projected
 *   - Particle field with depth
 *   - Mouse parallax + slow auto-rotation
 *   - Color follows --accent
 */
/**
 * HeroVideo — in-canvas "Topographic Drift" cinematic.
 *
 * Replaces the original ambient mp4. A field of horizontal contour
 * lines (each driven by stacked sines) flows from right to left and
 * slowly compresses toward the horizon as the user scrolls the pinned
 * hero. A second pass of accent-tinted highlights tracks lines that
 * cross the optical centre, giving the scene a soft glow without ever
 * leaving the dark editorial palette of the site.
 *
 * The `src` prop is preserved for API compatibility but ignored.
 * Same scroll-scrub contract as the previous version: progress is
 * derived from `.hero-scroll` so the surrounding layout doesn't change.
 */
/**
 * HeroVideo — "Fluid Grid Tunnel"
 *
 * Renders a perspective floor + ceiling grid that flows continuously
 * toward the viewer. Scroll progress drives three interconnected
 * parameters: focal length (perspective depth), flow velocity, and
 * the accent glow radius at the vanishing point — transitioning from
 * a wide, ambient drift to a focused, accelerating tunnel.
 *
 * Geometry: two horizontal planes (floor Y=0, ceiling Y=G_H) viewed
 * from a camera at height CAM_H. Lines are deformed by stacked sines
 * for an organic, fluid quality. All 3D → 2D is a single-pass
 * perspective divide (no matrix library needed).
 *
 * Respects prefers-reduced-motion: freezes time and flow when set.
 */
const HeroVideo = ({ src }) => {
  const canvasRef = React.useRef(null);
  const scrubRef  = React.useRef(0);
  const [scrubProgress, setScrubProgress] = React.useState(0);

  // ── Scroll-scrub (same contract as before) ──────────────────
  React.useEffect(() => {
    const compute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const scroller = el.closest(".hero-scroll");
      if (!scroller) return;
      const rect = scroller.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrubDist = Math.max(1, scroller.offsetHeight - vh);
      const p = Math.max(0, Math.min(1, -rect.top / scrubDist));
      scrubRef.current = p;
      setScrubProgress(p);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // ── Canvas render loop ───────────────────────────────────────
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width  = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const getAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#ff5b2e";
    const getBg  = () =>
      document.documentElement.getAttribute("data-theme") === "light" ? "#efece4" : "#0a0908";
    const getInk = () =>
      document.documentElement.getAttribute("data-theme") === "light" ? "#1a1817" : "#efece4";

    // hex / rgb(a) → rgba string with explicit alpha
    const hexA = (col, a) => {
      col = col.trim();
      if (col.startsWith("#")) {
        const n = col.length === 4
          ? col.slice(1).split("").map(c => parseInt(c + c, 16))
          : [parseInt(col.slice(1,3),16), parseInt(col.slice(3,5),16), parseInt(col.slice(5,7),16)];
        return `rgba(${n[0]},${n[1]},${n[2]},${+a.toFixed(3)})`;
      }
      const m = col.match(/[\d.]+/g).slice(0, 3);
      return `rgba(${m.join(",")},${+a.toFixed(3)})`;
    };

    // ── Grid world constants ─────────────────────────────────
    const NEAR   = 0.28;   // closest Z plane
    const FAR    = 22;     // farthest Z plane
    const RANGE  = FAR - NEAR;
    const G_W    = 3.0;    // half-width of grid (world units)
    const G_H    = 2.2;    // ceiling height
    const CAM_H  = 1.1;    // camera height above floor
    const COLS   = 12;     // lateral lines (0..COLS = 13 lines)
    const ROWS   = 26;     // cross-section rings flowing toward viewer

    // Perspective project: world (wx, wy, wz) → screen (sx, sy)
    const proj = (wx, wy, wz, vpX, vpY, fLen) => {
      if (wz < 0.01) return null;
      return {
        sx: vpX + (wx / wz) * fLen,
        sy: vpY + ((CAM_H - wy) / wz) * fLen,
      };
    };

    // Stacked-sine organic wave — displaces Y of each grid vertex
    const wave = (wx, wz, amp, time) =>
      amp * (
        Math.sin(wx * 2.0 + wz * 0.55 + time * 0.62) * 0.55 +
        Math.sin(wx * 0.75 - wz * 1.65 - time * 0.38) * 0.30 +
        Math.sin(wx * 4.1  + wz * 2.2  + time * 1.05) * 0.15
      );

    let t          = 0;
    let scrubEased = 0;
    let flowOffset = 0;
    let raf        = 0;

    // ── Draw one plane (floor or ceiling) ───────────────────
    const drawPlane = (floor, vpX, vpY, fLen, flowSpd, waveAmp, baseAlpha, accent, ink, p) => {
      const yBase   = floor ? 0 : G_H;
      const ySign   = floor ? 1 : -1;   // wave direction mirrors for ceiling
      const dimMul  = floor ? 1.0 : 0.5; // ceiling is subtler

      // ── Cross-section rings (constant Z, advancing toward camera) ──
      for (let ri = 0; ri < ROWS; ri++) {
        const rawZ = NEAR + (ri / ROWS) * RANGE;
        // Wrap Z around so rings cycle endlessly as flowOffset grows
        const wz = ((rawZ - flowOffset) % RANGE + RANGE) % RANGE + NEAR;
        if (wz < NEAR + 0.02) continue;

        const tZ      = (wz - NEAR) / RANGE;             // 0=near, 1=far
        const depthA  = Math.max(0, 1 - tZ * 1.05);      // closer = more opaque
        const nearPop = Math.max(0, 1 - wz / (NEAR + 1.8)); // accent pop for very-near rings
        const rushPop = Math.max(0, (p - 0.45) / 0.55) * Math.max(0, 1 - wz / (NEAR + 3.5));

        const lineA = (baseAlpha + depthA * 0.22) * dimMul;
        // Adaptive segments: fewer for distant rings
        const STEPS = Math.max(10, Math.round(18 * (1 - tZ * 0.45)));

        ctx.beginPath();
        for (let ci = 0; ci <= STEPS; ci++) {
          const wx = -G_W + (ci / STEPS) * G_W * 2;
          const wy = yBase + ySign * wave(wx, wz, waveAmp, t);
          const pt = proj(wx, wy, wz, vpX, vpY, fLen);
          if (!pt) continue;
          ci === 0 ? ctx.moveTo(pt.sx, pt.sy) : ctx.lineTo(pt.sx, pt.sy);
        }

        const accentBlend = (nearPop + rushPop) * dimMul;
        if (accentBlend > 0.04) {
          ctx.strokeStyle = hexA(accent, lineA * 0.5 + accentBlend * (0.32 + p * 0.38));
        } else {
          ctx.strokeStyle = hexA(ink, lineA);
        }
        ctx.lineWidth   = 0.55 + depthA * 0.7;
        ctx.globalAlpha = 1;
        ctx.stroke();
      }

      // ── Lateral lines (constant X, run away into depth) ──
      const LSTEPS = 30;
      for (let ci = 0; ci <= COLS; ci++) {
        const wx    = -G_W + (ci / COLS) * G_W * 2;
        const xFade = Math.max(0, 1 - Math.abs(wx / G_W) * 0.65); // center lines stronger

        ctx.beginPath();
        let first = true;
        for (let si = 0; si <= LSTEPS; si++) {
          const wz = NEAR + (si / LSTEPS) * (FAR - NEAR);
          const wy = yBase + ySign * wave(wx, wz, waveAmp * 0.6, t);
          const pt = proj(wx, wy, wz, vpX, vpY, fLen);
          if (!pt) continue;
          if (first) { ctx.moveTo(pt.sx, pt.sy); first = false; }
          else ctx.lineTo(pt.sx, pt.sy);
        }
        ctx.strokeStyle = hexA(ink, (baseAlpha * 0.65 + xFade * 0.08) * dimMul);
        ctx.lineWidth   = 0.45 + xFade * 0.5;
        ctx.globalAlpha = 1;
        ctx.stroke();
      }
    };

    // ── Main render loop ─────────────────────────────────────
    const render = () => {
      if (!reducedMotion) t += 1 / 60;
      scrubEased += (scrubRef.current - scrubEased) * 0.09;
      const p = scrubEased;

      // ── Scroll-driven parameters ─────────────────────────
      // Perspective: focal length increases → grid converges tighter at VP
      const fLen     = h * (0.42 + p * 0.68);
      // Flow: primary tunnel driver — slow ambient drift → screaming rush
      const flowSpd  = reducedMotion ? 0 : (0.14 + p * 3.2);
      // Fluid deformation amplitude grows with speed
      const waveAmp  = reducedMotion ? 0.04 : (0.055 + p * 0.09);
      // Vanishing point: drifts slightly upward with scroll (runway feel)
      const vpX      = w * 0.5;
      const vpY      = h * (0.5 - p * 0.04);
      // Focal accent glow at VP
      const glowR    = 40 + p * 200;
      const glowA    = 0.32 + p * 0.6;
      // Base grid line opacity — high enough to clearly read as a grid
      const baseA    = 0.18 + p * 0.12;

      flowOffset = (flowOffset + flowSpd / 60) % RANGE;

      const accent = getAccent();
      const ink    = getInk();
      const bg     = getBg();

      // ── Background ────────────────────────────────────────
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Ambient gradient toward VP (deepens with scroll)
      const bgR = Math.hypot(w, h) * 0.62;
      const bgG = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, bgR);
      bgG.addColorStop(0, hexA(accent, 0.04 + p * 0.055));
      bgG.addColorStop(1, hexA(bg,     0));
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, w, h);

      // ── Grid planes ──────────────────────────────────────
      drawPlane(true,  vpX, vpY, fLen, flowSpd, waveAmp, baseA, accent, ink, p); // floor
      drawPlane(false, vpX, vpY, fLen, flowSpd, waveAmp, baseA, accent, ink, p); // ceiling

      // ── Focal glow at vanishing point ────────────────────
      // Layered: tight core + broad halo — intensity spikes on scroll
      const fg = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, glowR);
      fg.addColorStop(0,    hexA(accent, glowA));
      fg.addColorStop(0.18, hexA(accent, glowA * 0.55));
      fg.addColorStop(0.5,  hexA(accent, glowA * 0.14));
      fg.addColorStop(1,    hexA(accent, 0));
      ctx.fillStyle = fg;
      ctx.fillRect(0, 0, w, h);

      // Hard lens flare dot at VP when fully into the tunnel
      if (p > 0.6) {
        const flareA = (p - 0.6) / 0.4;
        const fg2 = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, 6 + flareA * 8);
        fg2.addColorStop(0, hexA(ink,    0.6 * flareA));
        fg2.addColorStop(1, hexA(accent, 0));
        ctx.fillStyle = fg2;
        ctx.fillRect(vpX - 20, vpY - 20, 40, 40);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Subtle CSS scale tied to scroll — keeps the canvas filling the hero
  // even at high-scroll viewport shifts without any position change.
  const scale = 1.0 + scrubProgress * 0.028;

  return (
    <div className="hero-bg">
      <canvas
        ref={canvasRef}
        className="webgl"
        style={{
          transform: `scale(${scale.toFixed(4)})`,
          transformOrigin: "50% 50%",
        }}
      />
      <div className="hero-bg-scrim"></div>
    </div>
  );
};

const HeroCanvas = ({ accent, shape = "sphere" }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
    let scrollProg = 0; // 0..1 across first viewport
    let rafId = 0;
    let t = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      tMouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tMouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const onScroll = () => {
      // map scrollY against viewport for a rotation factor.
      // Hero is ~1 viewport tall; we want rotation to keep accumulating beyond it.
      scrollProg = window.scrollY / Math.max(1, window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Shape builder ----
    const buildShape = (kind) => {
      const E = []; // segments as [P, Q]
      let scl = 1; // shape-local scale multiplier (relative to base scale)

      const subEdge = (A, B, n, project = (p) => p) => {
        for (let i = 0; i < n; i++) {
          const t0 = i / n, t1 = (i + 1) / n;
          const p0 = [A[0]+(B[0]-A[0])*t0, A[1]+(B[1]-A[1])*t0, A[2]+(B[2]-A[2])*t0];
          const p1 = [A[0]+(B[0]-A[0])*t1, A[1]+(B[1]-A[1])*t1, A[2]+(B[2]-A[2])*t1];
          E.push([project(p0), project(p1)]);
        }
      };
      const norm = (p) => { const n = Math.hypot(...p) || 1; return [p[0]/n, p[1]/n, p[2]/n]; };

      if (kind === "sphere") {
        const phi = (1 + Math.sqrt(5)) / 2;
        const v = [
          [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
          [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
          [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
        ];
        const ed = [
          [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],
          [2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],
          [4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],
          [7,8],[7,10],[8,9],[10,11],
        ];
        for (const [a, b] of ed) subEdge(v[a], v[b], 5, norm);
        scl = 1;
      }
      else if (kind === "torus") {
        const R = 0.78, r = 0.28;
        const U = 32, V = 12;
        const pt = (u, v) => {
          const cu = Math.cos(u), su = Math.sin(u), cv = Math.cos(v), sv = Math.sin(v);
          return [(R + r*cv)*cu, r*sv, (R + r*cv)*su];
        };
        for (let i = 0; i < U; i++) {
          for (let j = 0; j < V; j++) {
            const u1 = (i/U)*Math.PI*2, u2 = ((i+1)/U)*Math.PI*2;
            const v1 = (j/V)*Math.PI*2, v2 = ((j+1)/V)*Math.PI*2;
            E.push([pt(u1, v1), pt(u2, v1)]);
            E.push([pt(u1, v1), pt(u1, v2)]);
          }
        }
        scl = 0.95;
      }
      else if (kind === "octahedron") {
        const v = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
        const ed = [
          [0,2],[0,3],[0,4],[0,5],
          [1,2],[1,3],[1,4],[1,5],
          [2,4],[2,5],[3,4],[3,5],
        ];
        for (const [a, b] of ed) subEdge(v[a], v[b], 8);
        scl = 1.1;
      }
      else if (kind === "cube") {
        const v = [
          [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
          [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1],
        ];
        const ed = [
          [0,1],[1,2],[2,3],[3,0],
          [4,5],[5,6],[6,7],[7,4],
          [0,4],[1,5],[2,6],[3,7],
        ];
        for (const [a, b] of ed) subEdge(v[a], v[b], 6);
        scl = 0.78;
      }
      else if (kind === "globe") {
        const LATS = 9, LONGS = 16, SEG = 24;
        // latitudes
        for (let i = 1; i < LATS; i++) {
          const phi = (i/LATS)*Math.PI - Math.PI/2;
          const cphi = Math.cos(phi), sphi = Math.sin(phi);
          let prev = [cphi, sphi, 0];
          for (let j = 1; j <= SEG; j++) {
            const lon = (j/SEG)*Math.PI*2;
            const p = [cphi*Math.cos(lon), sphi, cphi*Math.sin(lon)];
            E.push([prev, p]); prev = p;
          }
        }
        // meridians
        for (let j = 0; j < LONGS; j++) {
          const lon = (j/LONGS)*Math.PI*2;
          let prev = [Math.cos(-Math.PI/2)*Math.cos(lon), Math.sin(-Math.PI/2), Math.cos(-Math.PI/2)*Math.sin(lon)];
          for (let s = 1; s <= SEG; s++) {
            const phi = (s/SEG)*Math.PI - Math.PI/2;
            const cphi = Math.cos(phi), sphi = Math.sin(phi);
            const p = [cphi*Math.cos(lon), sphi, cphi*Math.sin(lon)];
            E.push([prev, p]); prev = p;
          }
        }
        scl = 1;
      }
      else if (kind === "knot") {
        // trefoil torus knot
        const N = 260;
        const pt = (t) => {
          const x = Math.sin(t) + 2 * Math.sin(2*t);
          const y = Math.cos(t) - 2 * Math.cos(2*t);
          const z = -Math.sin(3*t);
          return [x*0.28, y*0.28, z*0.34];
        };
        let prev = pt(0);
        for (let i = 1; i <= N; i++) {
          const p = pt((i/N) * Math.PI * 2);
          E.push([prev, p]); prev = p;
        }
        scl = 1.05;
      }
      return { E, scl };
    };

    const built = buildShape(shape);
    const subEdges = built.E;
    const shapeScale = built.scl;

    // Particles
    const PARTICLES = 90;
    const particles = Array.from({ length: PARTICLES }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      s: Math.random() * 0.6 + 0.2,
      r: Math.random() * 0.8 + 0.2,
    }));

    // Get accent color from CSS
    const getAccent = () => {
      return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#ff5b2e";
    };

    const draw = () => {
      const A = getAccent();
      const speed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--anim-speed")) || 1;
      ctx.clearRect(0, 0, w, h);

      // ease mouse
      mouseX += (tMouseX - mouseX) * 0.05;
      mouseY += (tMouseY - mouseY) * 0.05;

      const cx = w / 2, cy = h / 2;
      const scale = Math.min(w, h) * 0.32 * shapeScale;
      t += 0.004 * speed;

      // ----- Particles -----
      ctx.globalCompositeOperation = "source-over";
      for (const p of particles) {
        const rx = p.x;
        const ry = p.y;
        const rz = p.z;
        // gentle rotation
        const ang = t * 0.4 + p.s * 4;
        const px = rx * Math.cos(ang) - rz * Math.sin(ang);
        const pz = rx * Math.sin(ang) + rz * Math.cos(ang);
        const py = ry;
        // mouse parallax depth
        const depth = pz + 2.4 + mouseY * 0.2;
        const persp = 3 / depth;
        const sx = cx + (px + mouseX * 0.4) * scale * persp * 1.6;
        const sy = cy + (py + mouseY * 0.25) * scale * persp * 1.6;
        const alpha = Math.min(0.6, persp * 0.35);
        const size = p.r * persp * 1.4;
        ctx.fillStyle = `rgba(239,236,228,${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ----- Wireframe shape -----
      // Rotation matrices (Y + X). Scroll is the primary driver.
      // Time keeps a slow ambient drift even when not scrolling.
      const scrollSpin = scrollProg * Math.PI * 1.4;
      const ry = t * 0.35 + scrollSpin + mouseX * 0.5;
      const rx = t * 0.18 + scrollSpin * 0.35 + mouseY * 0.35;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const project = ([x, y, z]) => {
        // rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const depth = z2 + 3;
        const persp = 3 / depth;
        return {
          sx: cx + x1 * scale * persp,
          sy: cy + y2 * scale * persp,
          d: depth,
        };
      };

      // glow halo
      const grad = ctx.createRadialGradient(cx, cy, scale * 0.2, cx, cy, scale * 1.8);
      grad.addColorStop(0, hexA(A, 0.15));
      grad.addColorStop(1, hexA(A, 0));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // edges
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 0; i < subEdges.length; i++) {
        const [P, Q] = subEdges[i];
        const a = project(P), b = project(Q);
        const avgD = (a.d + b.d) / 2;
        const fade = Math.max(0, 1 - (avgD - 1.8) / 2.4);
        ctx.strokeStyle = hexA(A, fade * 0.85);
        ctx.lineWidth = 1.1 + fade * 0.6;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();

        // small node at endpoints for that wireframe feel (every Nth)
        if (i % 6 === 0) {
          ctx.fillStyle = hexA(A, fade);
          ctx.beginPath();
          ctx.arc(a.sx, a.sy, 1.5 + fade * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // crosshair brackets
      const bracketColor = "rgba(239,236,228,0.45)";
      ctx.strokeStyle = bracketColor;
      ctx.lineWidth = 1;
      const bs = 14, off = scale * 1.05;
      [[cx-off, cy-off], [cx+off, cy-off], [cx-off, cy+off], [cx+off, cy+off]].forEach(([x, y], i) => {
        ctx.beginPath();
        const dx = i % 2 === 0 ? 1 : -1;
        const dy = i < 2 ? 1 : -1;
        ctx.moveTo(x + dx * bs, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * bs);
        ctx.stroke();
      });

      rafId = requestAnimationFrame(draw);
    };

    // helper: hex/rgb to rgba string
    function hexA(col, a) {
      col = col.trim();
      if (col.startsWith("#")) {
        const c = col.length === 4
          ? col.slice(1).split("").map(x => parseInt(x + x, 16))
          : [parseInt(col.slice(1,3), 16), parseInt(col.slice(3,5), 16), parseInt(col.slice(5,7), 16)];
        return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
      }
      if (col.startsWith("rgb")) {
        // already rgb / rgba — splice in alpha
        const nums = col.match(/[\d.]+/g).slice(0,3);
        return `rgba(${nums.join(",")},${a})`;
      }
      return `rgba(255,91,46,${a})`;
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [accent, shape]);

  return <canvas ref={ref} className="webgl" />;
};

/** Returns scrolled state for nav */
const useScrolled = (threshold = 40) => {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setS(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return s;
};

/** Live clock for nav */
const useClock = () => {
  const [t, setT] = React.useState("");
  React.useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const f = (n) => String(n).padStart(2, "0");
      return `${f(d.getHours())}:${f(d.getMinutes())} EST`;
    };
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return t;
};

// useMagnetic — cursor-following spring transform for CTA buttons
// Returns { ref, style, onMouseMove, onMouseLeave }
const useMagnetic = (maxDelta = 12) => {
  const ref = React.useRef(null);
  const [xy, setXY] = React.useState({ x: 0, y: 0 });
  const onMouseMove = React.useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setXY({
      x: ((e.clientX - r.left) / r.width  - 0.5) * maxDelta * 2,
      y: ((e.clientY - r.top)  / r.height - 0.5) * maxDelta * 2,
    });
  }, [maxDelta]);
  const onMouseLeave = React.useCallback(() => setXY({ x: 0, y: 0 }), []);
  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: { transform: `translate(${xy.x.toFixed(2)}px,${xy.y.toFixed(2)}px)` },
  };
};

Object.assign(window, { useReveal, WordReveal, HeroCanvas, HeroVideo, useScrolled, useClock, useMagnetic });
