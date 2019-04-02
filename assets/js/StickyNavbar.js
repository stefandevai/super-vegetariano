"use strict";

const requestAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

const browserSupportsSmoothScroll = () => {
  return document.createElement('div').style.scrollBehavior !== undefined;
}

class StickyNavbar {
  constructor(height) {
    this.height = height;
    this.breakpoints = {};
    this.itemsElements = {};
    this.current_hl_id = '';

    this.stickyTrigger = document.getElementsByClassName("sticky-menu-trigger")[0].offsetTop - this.height;
    this.stickyNav = document.getElementById("sticky-navbar");

    if (browserSupportsSmoothScroll()) this.scrollToElement = this._scrollToElementBrowserSupport;
    else this.scrollToElement = this._scrollToElementSmooth;

    if (this.stickyNav != null) {
      this._manageNavbar();
    }
    else {
      console.log("StickyNavbar not defined. Add 'sticky-navbar' to a element.");
    }
  }

  _manageNavbar() {
    this._prepareHighlight();

    window.onscroll = () => {
      this._toggleNavbar();
      this._highlight();
    }
  }

  // TODO Avoid changing style on every loop
  _toggleNavbar() {
    if (window.pageYOffset <= 0) {
      this.stickyNav.style.opacity = "0";
    }
    else {
      this.stickyNav.style.opacity = "1";
    }

    if (window.pageYOffset >= this.stickyTrigger) {
      this.stickyNav.style.top = "0";
      this.stickyNav.style.opacity = "1";
    }
    else {
      this.stickyNav.style.top = "-" + this.height.toString()  + "px";
      this.stickyNav.style.opacity = "0";
    }
  }

  _prepareHighlight() {
    let navItems = document.getElementsByClassName("nav-item");
    const self = this;

    [...navItems].forEach((item) => {
      let target = item.dataset.target;
      this.breakpoints[target] = document.getElementById(target).offsetTop - window.innerHeight / 2;
      this.itemsElements[target] = item;

      item.addEventListener("click", function() {
        self._scrollFromClick(this);
      }, false);

    });
    this.breakpoints['end'] = document.body.offsetHeight;
  }

  _highlight() {
    let last_key = '';
    for (let key in this.breakpoints) {
      if (window.pageYOffset < this.breakpoints[key] && window.pageYOffset > this.breakpoints[last_key] && last_key !== this.current_hl_id) {
        let last_el = this.itemsElements[this.current_hl_id];
        if (last_el != null) {
          last_el.classList.remove("nav-hl");
        }
        this.itemsElements[last_key].classList.add("nav-hl");
        this.current_hl_id = last_key;
        break;
      }
      last_key = key;
    }
  }

  _scrollFromClick(clickable) {
    const eid = document.getElementById(clickable.dataset.target);
    this.scrollToElement(eid);
  }

  // From https://gist.github.com/andjosh/6764939
  // and https://gist.github.com/felipenmoura/650e7e1292c1e7638bcf6c9f9aeb9dd5
  _scrollToElementSmooth(to, top=-1, duration=1000) {
    const easeInOutCubic = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t + 2) + b;
    };

    return new Promise((resolve, reject) => {
      const element = document.scrollingElement;
      if (top != -1) to = top;
      else to = to.getBoundingClientRect().top + element.scrollTop - this.height;


      let start = element.scrollTop, change = to - start, currentTime = 0, increment = 20;
      const animateScroll = function() {
          currentTime += increment;
          let val = easeInOutCubic(currentTime, start, change, duration);
          element.scrollTop = val;
          if(currentTime < duration) {
              requestAnimFrame(animateScroll);
          } else {
            resolve();
          }
      };
      animateScroll();
    });
  }

  _scrollToElementBrowserSupport(el, top=-1) {
    if (top == -1) top = el.offsetTop - this.height;
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: top
    });
  }

  scrollToId(eid) {
    const el = document.getElementById(eid);
    this.scrollToElement(el);
  }

  scrollToY(y) {
    this.scrollToElement(undefined, y);
  }
}

