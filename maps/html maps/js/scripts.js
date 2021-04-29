var urlmap = 'http://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png';
var attribution = "<a href='http://www.ign.gob.ar/' target='_blank' title='Instituto GeogrÃ¡fico Nacional'>IGN</a>";

var mapa_base = L.tileLayer(urlmap, {
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

/***************************** BASE MAPS ***************************************/

var MyBingMapsKey = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L'
    var bingMap =L.tileLayer.bing(MyBingMapsKey);
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
    var Argenmap_gris = L.tileLayer("https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png")

    var baseLayersMaps  = {
        "Argenmap": mapa_base,
        "Argenmap gris": Argenmap_gris,
        "Bing Satelital": bingMap,
        "OpenStreetMap":OpenStreetMap_Mapnik
    };

L.control.layers(baseLayersMaps,null,{collapsed:true}).addTo(map);

L.control.coordinates({position:'bottomright',imperial:false}).addTo(map);

/************** LAYERS *****************/
var wmsLayer= L.tileLayer.wms('http://localhost:8080/geoserver/CURSO/Poblacion_PBA/wms?', {
    layers: 'CURSO:Poblacion_PBA',
    styles: 'Poblacion_PBA',
    format: 'image/png',
    transparent: true,
    className:'capa',
});
var eduLayer= L.tileLayer.wms('http://mapaescolar.abc.gob.ar/geodie/wms', {
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

map.addLayer(wmsLayer);

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

var miniMap = new L.Control.MiniMap(openLayer, {position:'bottomright',width:'100',height:'100'}).addTo(map);

/*************LAYERS BUTTON CONTROLS******************/
array_capas = [wmsLayer, eduLayer, arbaLayer];
capa_actual = 0;

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