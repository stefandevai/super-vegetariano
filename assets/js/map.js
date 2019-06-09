"use strict";

(function(){
  let map;
  let tileLayer;
  let rest1, rest2, rest3;
  const svMarker = L.icon({
    iconUrl: 'assets/images/map_marker.png',
    shadowUrl: 'assets/images/map_marker_shadow.png',

    iconSize:     [44, 43],
    shadowSize:   [56, 28],
    iconAnchor:   [22, 43],
    shadowAnchor: [9, 28],
    popupAnchor:  [0, -35]
  });

  const anchors = document.getElementsByClassName('address-anchor');
  let popups = {};

  function initMap() {
    map = L.map('map', {
      center: [19.7069009,-101.1893867],
      zoom: 13.5,
      attributionControl: false,
      inertia: true,
    });

    tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    popups['centro'] = L.marker([19.704284,-101.1961674], {icon: svMarker}).addTo(map);
    popups['mariano'] = L.marker([19.6956704,-101.1767561], {icon: svMarker}).addTo(map);
    popups['valentin'] = L.marker([19.7075915,-101.195379], {icon: svMarker}).addTo(map);

    //popups['centro'].bindPopup("<a href='https://goo.gl/maps/ew1ZkJfavMt' target='_blank'><b>Ver en Google Maps</b></a><h3>Calle Valentín Gomez Farias 151,<br>Centro Histórico,<br>Morelia, Michoacán.<br></h3>");
    //popups['mariano'].bindPopup("<h3>SUPER VEGETARIANO</h3><br>Calle General Mariano Monterde 247<br>Colonia Chapultepec Norte<br>Morelia, Michoacán.<br><a href='https://goo.gl/maps/KWoWyg3kha32' target='_blank'><b>Mapa</b></a>");
    //popups['valentin'].bindPopup("<h3>SUPER VEGETARIANO</h3><br>Calle Valentín Gomez Farias 115<br>Colonia Industrial<br>Morelia, Michoacán.<br><a href='https://goo.gl/maps/bq8tcUtAcyC2' target='_blank'><b>Mapa</b></a>");
    popups['centro'].bindPopup("<h3>Super Vegetariano - Centro</h3><div><img src='assets/images/rest.jpg'><div><a href='https://goo.gl/maps/ew1ZkJfavMt' target='_blank'>Ver en Google Maps</a>");
    popups['mariano'].bindPopup("<h3>Super Vegetariano - Mariano</h3><div><img src='assets/images/rest.jpg'><div><a href='https://goo.gl/maps/KWoWyg3kha32' target='_blank'>Ver en Google Maps</a>");
    popups['valentin'].bindPopup("<h3>Super Vegetariano - Valentín</h3><div><img src='assets/images/rest.jpg'><div><a href='https://goo.gl/maps/bq8tcUtAcyC2' target='_blank'>Ver en Google Maps</a>");
  }

  function addressLinks() {
    [...anchors].forEach((anchor) => {
      anchor.addEventListener('click', function(e) {
        if (this.classList.contains("active")) this.classList.remove("active");
        else {
          this.classList.add("active");
          [...anchors].forEach(((a) => {
            if (a != this && a.classList.contains("active")) a.classList.remove("active");
          }).bind(this));
        }

        e.preventDefault();
        const marker = popups[this.dataset.popup];
        const latLngs = [marker.getLatLng()];
        map.setView(latLngs[0], 16);
        marker.togglePopup();
      }, false);
    });

  }

  initMap();
  addressLinks();
})();
