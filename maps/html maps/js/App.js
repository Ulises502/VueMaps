var app = new Vue({
    el: '#app',
    data: {
      wms: "",
      capa: "",
      estilo: "",
      Layer: null,
    },
    methods: {
        loadLayer() {
            this.Layer= L.tileLayer.wms(this.wms, {
                layers: this.capa,
                styles: this.estilo,
                format: 'image/png',
                transparent: true,
                className:'capa',
            });
            map.addLayer(this.Layer);
        }
    }
})