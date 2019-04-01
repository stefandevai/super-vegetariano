"use stric";

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
          if (!other.classList.contains("primary")) {
            other.style.opacity = "1";
          }
        });
      }

      else {
        this.classList.add("primary");
        this.style.zIndex = "2";
        grid.style.gridColumnGap = "0";
        grid.style.gridRowGap = "0";

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
