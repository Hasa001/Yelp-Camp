mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: [camp.geometry.coordinates[0],camp.geometry.coordinates[1]], // starting position [lng, lat]
zoom: 9, // starting zoom
}); 
// console.log(camp.geometry.coordinates[0]);

const marker1 = new mapboxgl.Marker({ color: 'black' })
.setLngLat([camp.geometry.coordinates[0],camp.geometry.coordinates[1]])
.addTo(map);

map.addControl(new mapboxgl.FullscreenControl());
// cord.geometry.coordinates[0],cord.geometry.coordinates[1]