(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers = [...document.querySelectorAll('[data-depth]')];
  const video = document.querySelector('.hero-video');
  let queued = false;

  function update() {
    queued = false;
    for (const layer of layers) {
      const depth = Number(layer.dataset.depth) || 0;
      layer.style.setProperty('--depth', '1');
      layer.style.setProperty('--parallax', `${motion.matches ? 0 : -Math.min(window.scrollY, 1000) * depth}px`);
    }
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }
  function playback() {
    if (!video) return;
    video.muted = true;
    if (motion.matches || document.hidden) video.pause();
    else video.play().catch(() => {});
  }
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  window.addEventListener('scroll', schedule, { passive: true });
  motion.addEventListener('change', () => { update(); playback(); });
  document.addEventListener('visibilitychange', playback);
  update();
  playback();
})();
