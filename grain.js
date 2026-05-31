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
  let idx = 0;
  ctx.putImageData(tiles[0], 0, 0);
  setInterval(() => {
    idx = (idx + 1) % tiles.length;
    ctx.putImageData(tiles[idx], 0, 0);
  }, 110);
})();
