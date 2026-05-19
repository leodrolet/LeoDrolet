export function applyMagnetic(el: HTMLElement): () => void {
  el.style.willChange = 'transform';
  let rafId: number;

  function onMove(e: MouseEvent) {
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      el.style.transition = 'transform 0.1s linear';
      el.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
    });
  }

  function onLeave() {
    cancelAnimationFrame(rafId);
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    el.style.transform = 'translate(0, 0)';
  }

  el.addEventListener('mousemove', onMove, { passive: true });
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    cancelAnimationFrame(rafId);
  };
}
