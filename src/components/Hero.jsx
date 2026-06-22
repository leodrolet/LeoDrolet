/* ============================================================
   Hero.jsx, Section hero avec effet dithering canvas
   Dépend de : window.useMagnetic
   ============================================================ */

const { useMagnetic } = window;
const { motion: m } = window.Motion || {};

// ── Effet dithering Bayer sur canvas ──
const BAYER4 = [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];

const HeroDithering = ({ speedRef }) => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const CELL = 3;
    let w = 0, h = 0, t = 0, raf = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.floor(r.width); h = Math.floor(r.height);
      canvas.width = w; canvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const getAccentRGB = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff5b2e';
      if (v.startsWith('#') && v.length === 7)
        return [parseInt(v.slice(1,3),16), parseInt(v.slice(3,5),16), parseInt(v.slice(5,7),16)];
      return [255, 91, 46];
    };
    const draw = () => {
      t += (speedRef.current || 0.2) * 0.016;
      ctx.clearRect(0, 0, w, h);
      const [ar, ag, ab] = getAccentRGB();
      ctx.fillStyle = `rgba(${ar},${ag},${ab},0.55)`;
      const cols = Math.ceil(w / CELL), rows = Math.ceil(h / CELL);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const nx = cx / cols, ny = cy / rows;
          const wx = nx + Math.sin(ny * 3.0 + t * 0.7) * 0.12;
          const wy = ny + Math.cos(nx * 2.8 - t * 0.5) * 0.10;
          const noise = (Math.sin(wx * 4.8 + t) * Math.cos(wy * 4.2 - t * 0.7)) * 0.5 + 0.5;
          if (noise > BAYER4[cy % 4][cx % 4] / 16)
            ctx.fillRect(cx * CELL, cy * CELL, CELL, CELL);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return React.createElement('canvas', {
    ref: canvasRef,
    style: { position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', display:'block' }
  });
};

// ── Parse la headline (support *italic* et **accent**) ──
const parseHeadline = (text) => {
  const segments = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|[^*]+)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const t = match[0];
    if (t.startsWith('**') && t.endsWith('**')) segments.push({ kind: 'accent', text: t.slice(2, -2) });
    else if (t.startsWith('*') && t.endsWith('*')) segments.push({ kind: 'italic', text: t.slice(1, -1) });
    else segments.push({ kind: 'plain', text: t });
  }
  return segments;
};

// ── Composant Hero principal ──
const Hero = ({ headline }) => {
  const [hovered, setHovered] = React.useState(false);
  const speedRef = React.useRef(0.2);
  React.useEffect(() => { speedRef.current = hovered ? 0.6 : 0.2; }, [hovered]);
  const ctaMagnetic = useMagnetic(10);
  const segments = React.useMemo(() =>
    parseHeadline(headline || "Sites web qui *ramènent des clients,* pour les **PME de Gatineau.**"),
  [headline]);

  const onCardMouseMove = React.useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--hx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--hy', `${e.clientY - r.top}px`);
  }, []);

  return (
    <section className="hero-section" id="top">
      <div
        className="hero-card"
        onMouseMove={onCardMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="hero-card-dither"><HeroDithering speedRef={speedRef} /></div>
        <div className="hero-card-scrim" />
        <div className="hero-mesh" aria-hidden="true">
          <div className="hero-mesh-orb hero-mesh-orb--1" />
          <div className="hero-mesh-orb hero-mesh-orb--2" />
          <div className="hero-mesh-orb hero-mesh-orb--3" />
        </div>
        <div className="hero-card-inner">
          <h1 className="hero-title">
            {segments.map((seg, i) => (
              <span key={i} className={seg.kind === 'italic' ? 'word italic' : seg.kind === 'accent' ? 'word accent' : ''}>
                {seg.text}
              </span>
            ))}
          </h1>
          <div className="hero-ctas">
            <a
              className="btn btn-accent"
              href="/contact"
              ref={ctaMagnetic.ref}
              onMouseMove={ctaMagnetic.onMouseMove}
              onMouseLeave={ctaMagnetic.onMouseLeave}
              style={ctaMagnetic.style}
            >
              Démarrer mon projet <span className="arrow">&#8594;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
