let applyParallax = (function(eids, strength) {
  window.addEventListener('scroll', (e) => {
    const offset = window.pageYOffset;
    strength = 0.1;
    let ms = strength;
    eids.forEach((eid) => {
      const el = document.getElementById(eid);
      el.style.top = (offset * ms) + 'px';
      ms *= 0.6;
    });
  });
});
