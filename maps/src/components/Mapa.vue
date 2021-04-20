<template>
  <div id="container">
    <div id="container-info">
      <Filtro>
        <Checkbox v-for="item in checkboxes" :key="item.name"
          v-model="item.selected"
          :name="item.name"      
          :label="item.label"
          @change="change()"
        />
      </Filtro>
      <div id="info">
        <div v-if="this.attraction.name">
          <p>
            <strong>Name:</strong>
            {{this.attraction.name}}
          </p>
          <p>
            <strong>Address:</strong>
            {{this.attraction.address}}
          </p>
          <p>
            <strong>Type:</strong>
            {{this.attraction.category}}
          </p>
        </div>
      </div>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import 'core-js';
import L from "leaflet";
//import data from "../Historic-Landmarks.json";
//import axios from "axios";
import Filtro from "./Filtro.vue"
import Checkbox from "./Checkbox/Checkbox.vue"

export default {
    name: "Mapa",
    components: {
      Filtro,
      Checkbox,
    },
  data() {
    return {
      center: [-37.2017, -59.8411],
      //data: [],
      map: null,
      urlmap: "",
      atribution: "",
      mapa_base: null,
      attraction: {
        name: "",
        address: "",
        category: "",
      },
      checkboxes: [],
      feats: [],
    };
  },
  methods: {
    setupLeafletMap () {
      this.urlmap = 'http://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png';
      this.attribution = "<a href='http://www.ign.gob.ar/' target='_blank' title='Instituto GeogrÃ¡fico Nacional'>IGN</a>";
      this.mapa_base = L.tileLayer(this.urlmap, {
        tms: true,
        maxZoom: 18,
        attribution: this.attribution,
        name:'mapa_base'
      });
      this.map = L.map('mapContainer', {
        center: [-37.2017, -59.8411],
        zoom: 6,
        zoomControl: false,
        layers: [this.mapa_base],
        minZoom: 3,
        maxZoom: 18
      });
      //L.tileLayer(
        //'http://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{y}.png',
        //{
          //attribution:
            //"<a href='http://www.ign.gob.ar/' target='_blank' title='Instituto GeogrÃ¡fico Nacional'>IGN</a>",
          //maxZoom: 18,
        //}
      //).addTo(this.map);
      L.control.scale({position:'bottomright',imperial:false}).addTo(this.map);
    },

    //listCheckboxes() {
      //for (let index = 0; index < 5; index++) {
        
            //if (this.checkboxes.length<5 && !this.checkboxes.some( e => 
                //e.name === data.data.response.venues[0].categories[0].name && 
                //e.label === data.data.response.venues[0].categories[0].nameS
              //)) {
              //this.checkboxes.push(
                //{name: data.data.response.venues[0].categories[0].name,
                //label: data.data.response.venues[0].categories[0].name,}
              //)
            //}
          //});
      //}
    //},

    change() {

    }
  },
  mounted() {
    this.setupLeafletMap();
    //this.listCheckboxes();
  },
};
</script>

<style scoped>
#container {
  display: flex;
}
#info {
  margin-top: 48vh;
  width: 18vw;
  height: 48vh;
}
#container-info {
  width: 18vw;
  height: 95vh;
}
#mapContainer {
  width: 80vw;
  height: 95vh;
  display: flex;
  flex-wrap: wrap;
}
filtro {
  width: 18vw;
  height: 48vh;
}
</style>