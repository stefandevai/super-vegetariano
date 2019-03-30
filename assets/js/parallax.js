let applyParallax = (function(eids, strength) {
  let scrollPos = 0;
  window.addEventListener('scroll', (e) => {
    let ms = strength;

    eids.forEach((eid) => {
      const el = document.getElementById(eid);
      let delta = window.pageYOffset;
      //console.log(delta);
      //el.style.top = el.offsetTop - window.pageYOffset * ms + 'px';
      el.style.transform = "translateY(" + -window.pageYOffset*ms + "px)";
      ms *= 0.3;
    });
  });
});
