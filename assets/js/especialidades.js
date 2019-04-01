"use strict";

(function(){
  const grid = document.getElementById("image-mosaic");

  let imgs = document.getElementsByClassName("foto-especialidad");
  [...imgs].forEach((img) => {
    img.addEventListener("click", function() { 
      if (this.classList.contains("primary")) {
        this.classList.remove("primary");
        this.style.zIndex = "1";
        grid.style.gridColumnGap = "13px";
        grid.style.gridRowGap = "13px";

        let others = document.getElementsByClassName("foto-especialidad");
        [...others].forEach((other) => {
          if (other != this) {
            other.style.opacity = "1";
          }
        });

        // Description
        const descId = this.dataset.description;
        let desc = document.getElementById(descId);
        desc.classList.add("hide-description");
        desc.style.opacity = "0";
        let defDesc = document.getElementById("default-description");
        defDesc.classList.remove("hide-description");
        defDesc.style.opacity = "1";
      }

      else {
        this.classList.add("primary");
        this.style.zIndex = "2";

        setTimeout((function() {
          if (this.classList.contains("primary")) {
            grid.style.gridColumnGap = "0";
            grid.style.gridRowGap = "0";
          }
        }).bind(this), 150);

        switch(countNextSiblings(this)) {
          case 3:
            this.style.transformOrigin = "top left";
            break;
          case 2:
            this.style.transformOrigin = "top right";
            break;
          case 1:
            this.style.transformOrigin = "bottom left";
            break;
          case 0:
            this.style.transformOrigin = "bottom right";
            break;
        }

        let others = document.getElementsByClassName("foto-especialidad");
        [...others].forEach((other) => {
          if (other != this) {
            other.style.opacity = "0";
          }
        });
        
        // Description
        const descId = this.dataset.description;
        let desc = document.getElementById(descId);
        desc.classList.remove("hide-description");
        desc.style.opacity = "1";
        let defDesc = document.getElementById("default-description");
        defDesc.classList.add("hide-description");
        defDesc.style.opacity = "0";
      }
    }, false);
  });

  function countNextSiblings(el) {
    let num_siblings = 0;
    while (el = el.nextElementSibling)
      num_siblings++;
    return num_siblings;
  }
})();
