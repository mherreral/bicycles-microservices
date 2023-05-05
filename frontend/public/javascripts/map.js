var map = L.map('map').setView([6.2476, -75.5658], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([6.2476, -75.5658]).addTo(map)
    .bindPopup('My bici')
    .openPopup();