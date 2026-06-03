(() => {
  const c = document.getElementById('grain-canvas');
  if (!c) return;
  const ctx = c.getContext('2d', { alpha: true });
  const SIZE = 220;
  c.width = SIZE; c.height = SIZE;
  c.style.width = '100vw'; c.style.height = '100vh';
  c.style.imageRendering = 'pixelated';
  const tiles = [];
  for (let k = 0; k < 6; k++) {
    const img = ctx.createImageData(SIZE, SIZE);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i+1] = d[i+2] = v;
      d[i+3] = 255;
    }
    tiles.push(img);
  }

  // Neutralise the grain over the portrait (overlay at 128/255 = no-op).
  function clearPortrait() {
    const el = document.querySelector('.about-portrait');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const sx = SIZE / window.innerWidth;
    const sy = SIZE / window.innerHeight;
    ctx.fillStyle = 'rgb(128,128,128)';
    ctx.fillRect(
      Math.floor(r.left * sx),
      Math.floor(r.top  * sy),
      Math.ceil(r.width  * sx) + 1,
      Math.ceil(r.height * sy) + 1
    );
  }

  let idx = 0;
  ctx.putImageData(tiles[0], 0, 0);
  clearPortrait();
  setInterval(() => {
    idx = (idx + 1) % tiles.length;
    ctx.putImageData(tiles[idx], 0, 0);
    clearPortrait();
  }, 110);
})();
