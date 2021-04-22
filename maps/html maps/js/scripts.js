var urlmap = 'http://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png';
var attribution = "<a href='http://www.ign.gob.ar/' target='_blank' title='Instituto GeogrÃ¡fico Nacional'>IGN</a>";

var mapa_base = L.tileLayer(urlmap, {
    renderer: L.svg(),
    tms: true,
    maxZoom: 18,
    attribution: attribution,
    name:'mapa_base'
});

var map = L.map('map', {
    center: [-37.2017, -59.8411],
    zoom: 6,
    zoomControl: false,
    layers: [mapa_base],
    minZoom: 3,
    maxZoom: 18
});

L.control.scale({position:'bottomright',imperial:false}).addTo(map);

var wmsLayer= L.tileLayer.wms('http://localhost:8080/geoserver/CURSO/Poblacion_PBA/wms?', {
    layers: 'CURSO:Poblacion_PBA',
    styles: 'Poblacion_PBA',
    format: 'image/png',
    transparent: true,
    className:'capa',
});
var eduLayer= L.tileLayer.wms('http://mapaescolar.abc.gob.ar/geodie/wms?SERVICE=WMS&', {
    layers: 'capaprivada:circuitos_electorales',
    styles: 'capaprivada:circuitos',
    format: 'image/png',
    transparent: true,
    className:'capa',
});
var arbaLayer= L.tileLayer.wms('http://geo.arba.gov.ar/geoserver/idera/ows?SERVICE=WMS&', {
    layers: 'Departamento',
    styles: 'idera:Departamento',
    format: 'image/png',
    transparent: true,
    className:'capa',
});

map.addLayer(eduLayer);

/***************OPACITY CONTROLS*******************/

var higherOpacity = new L.Control.higherOpacity();
map.addControl(higherOpacity);
var lowerOpacity = new L.Control.lowerOpacity();
map.addControl(lowerOpacity);

higherOpacity.setOpacityLayer(wmsLayer);
lowerOpacity.setOpacityLayer(wmsLayer);

/*******************MINI MAP CONTROLS************/

var openLayer= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18, 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var miniMap = new L.Control.MiniMap(openLayer).addTo(map);

/*************BUTTON CONTROLS******************/
array_capas = [wmsLayer, eduLayer, arbaLayer];
capa_actual = 0;

document.getElementsByClassName('button').addEventListener("click", cambiarCapa());

function cambiarCapa() {
    map.removeLayer(array_capas[capa_actual]);
    if (capa_actual != 2) {
        capa_actual += 1;
    }
    else {
        capa_actual = 0
    }
    map.addLayer(array_capas[(capa_actual)]);
};