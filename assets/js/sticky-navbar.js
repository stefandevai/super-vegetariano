(function() {
  let scroll = 0;
  const stickyTrigger = document.getElementById("sticky-menu-trigger").offsetTop;
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
})();
