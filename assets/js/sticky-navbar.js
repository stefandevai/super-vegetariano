class StickyNavbar {
  constructor() {
    let scroll = 0;
    const stickyTrigger = document.getElementsByClassName("sticky-menu-trigger")[0].offsetTop;
    let stickyNav = document.getElementById("sticky-navbar");
    window.onscroll = () => {
      if (window.pageYOffset <= 0) {
        stickyNav.style.opacity = "0";
      }
      else {
        stickyNav.style.opacity = "1";
      }

      if (window.pageYOffset >= stickyTrigger) {
        stickyNav.style.top = "0";
      }
      else {
        stickyNav.style.top = "-73px";
      }
    }
  }

  smoothScroll(eid) {
    console.log(eid);
    const el = document.getElementById(eid);
    if (eid === 'top') {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
      });
    }
    else {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: el.offsetTop
      });
    }
  }
}
  
let navHome = new StickyNavbar;
