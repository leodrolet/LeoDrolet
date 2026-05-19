import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const render = () => {
      glow.style.left = `${mouseX}px`;
      glow.style.top = `${mouseY}px`;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 0,
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.08s linear, top 0.08s linear',
        left: '-1000px',
        top: '-1000px',
      }}
    />
  );
};

export default CursorGlow;
