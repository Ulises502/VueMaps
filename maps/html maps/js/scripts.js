var map = L.Map('map', {center = [-42.7946,147.2576], zoom: 13, renderer: L.svg()});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

//var wmsLayer= L.tileLayer.wms("https://maps.gcc.tas.gov.au/geoserver/gwc/service/wms", {
    //layers: 'GCC_cc:Stormwaterpipes',
    //format: 'image/png',
    //transparent: true
//});
//map.addLayer(wmsLayer);