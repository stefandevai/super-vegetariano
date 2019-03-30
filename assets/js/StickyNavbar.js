class StickyNavbar {
  constructor(height) {
    this.height = height;
    this.breakpoints = {};
    this.itemsElements = {};
    this.current_hl_id = '';

    this.stickyTrigger = document.getElementsByClassName("sticky-menu-trigger")[0].offsetTop - this.height;
    this.stickyNav = document.getElementById("sticky-navbar");

    this._manageNavbar();
  }

  _manageNavbar() {
    this._prepareHighlight();

    window.onscroll = () => {
      this._toggleNavbar();
      this._highlight();
    }
  }

  _toggleNavbar() {
    if (window.pageYOffset <= 0) {
      this.stickyNav.style.opacity = "0";
    }
    else {
      this.stickyNav.style.opacity = "1";
    }

    if (window.pageYOffset >= this.stickyTrigger) {
      this.stickyNav.style.top = "0";
    }
    else {
      this.stickyNav.style.top = "-" + this.height.toString()  + "px";
    }
  }

  _prepareHighlight() {
    let navItems = document.getElementsByClassName("nav-item");
    [...navItems].forEach((item) => {
      let target = item.dataset.target;
      this.breakpoints[target] = document.getElementById(target).offsetTop - window.innerHeight / 2;
      this.itemsElements[target] = item;

      item.addEventListener("click", this.scroll, false);
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

  scroll() {
    const eid = this.dataset.target;
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

  scrollTo(eid) {
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
