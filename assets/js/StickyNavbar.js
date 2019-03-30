class StickyNavbar {
  constructor(height, ids) {
    this.height = height;
    this.ids = ids;
    this.breakpoints = {};
    this.current_hl_id = '';

    this._highlight();
    this._manageNavbar();
  }

  _manageNavbar() {
    let scroll = 0;
    const stickyTrigger = document.getElementsByClassName("sticky-menu-trigger")[0].offsetTop - this.height;
    let stickyNav = document.getElementById("sticky-navbar");

    window.onscroll = () => {
      // Nav appears
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
        stickyNav.style.top = "-" + this.height.toString()  + "px";
      }

      // Menu highlights
      let last_key = '';
      for (let key in this.breakpoints) {
        if (window.pageYOffset < this.breakpoints[key] && window.pageYOffset > this.breakpoints[last_key] && last_key !== this.current_hl_id) {
          let last_el = document.getElementById("nav-item-" + this.current_hl_id);
          if (last_el != null) {
            last_el.classList.remove("nav-hl");
          }

          let el = document.getElementById("nav-item-" + last_key);
          el.classList.add("nav-hl");

          this.current_hl_id = last_key;
          break;
        }
        last_key = key;
      }

    }
  }

  _highlight() {
    this.ids.map((id) => {
      //console.log(id);
      this.breakpoints[id] = document.getElementById(id).offsetTop - window.innerHeight / 2;
    });
    this.breakpoints['end'] = document.body.offsetHeight;
    //console.log(this.breakpoints);
  }

  scroll(eid) {
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
