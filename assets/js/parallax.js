let applyParallax = (function(eids, strength) {
  let scrollPos = 0;
  window.addEventListener('scroll', (e) => {
    let ms = strength;

    eids.forEach((eid) => {
      const el = document.getElementById(eid);
      let delta = window.pageYOffset;
      el.style.transform = "translateY(" + window.pageYOffset*ms + "px)";
      ms *= 0.3;
    });
  });
});
