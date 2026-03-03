
// MapLibre + MapTiler

document.addEventListener("DOMContentLoaded", function () {
  if (!window.apikey) {
    console.error("API key not found!");
    return;
  }
  
  //map initialization
  var map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${window.apikey}`,
    center: parkingspot.geometry.coordinates, 
    zoom: 9,
  });

  //add map marker
  // console.log(coordinates);
  const marker = new maplibregl.Marker({ color: "red" })
  .setLngLat(parkingspot.geometry.coordinates)   // [longitude, latitude] -> ye coordinates hai, listing.geometry.coordinates k ander jo hai.
  .setPopup(new maplibregl.Popup({offset: 25}).setHTML(
    `<h4>${parkingspot.title}</h4><p>Exact location will be provided after booking</p>`
  ))
  .addTo(map);
});


