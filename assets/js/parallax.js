let applyParallax = (function(eids, strength) {
  window.addEventListener('scroll', (e) => {
    let ms = strength;

    eids.forEach((eid) => {
      const el = document.getElementById(eid);
      const offset = this.pageYOffset - el.offsetTop;
      //console.log(offset);
      let delta = offset * ms;
      el.style.top = delta + 'px';
      ms *= 0.6;
    });
  });
});
