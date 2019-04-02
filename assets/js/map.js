"use strict";

let map = L.map('map', {
  center: [19.7036651,-101.1867948],
  zoom: 14.74,
  attributionControl: false,
  inertia: true,
});

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([19.704284,-101.1961674]).addTo(map);
L.marker([19.6956704,-101.1767561]).addTo(map);
L.marker([19.7075915,-101.195379]).addTo(map);

