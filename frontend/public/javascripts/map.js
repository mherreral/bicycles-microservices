var map = L.map('map').setView([39.757361, -105.109869], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$.ajax({
    datatype: "json",
    url: "http://127.0.0.1:5000/api/v1/list",
    success: function (results) {
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            console.log(results[i]._id);
            L.marker(results[i].location, {
                title: "Bicicleta Nº: " + results[i]._id + " Modelo: " + results[i].model
            }).addTo(map).bindPopup("Bicicleta Nº: " + results[i]._id + " Modelo: " + results[i].model)
        }
    }
});
