<template>
  <div id="app" class="bg-container" :class="bgImage">
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <SearchBar @getSearchedDataFunction="getSearchedData"/>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <MainInfo
            @changeDegreeFunction="changeDegree"
              :city="this.city"
              :country="this.country"
              :condition="this.condition"
              :mainTemp="this.mainTemp"
              :feelsLikeTemp="this.feelsLikeTemp"
              :maxTemp="this.maxTemp"
              :minTemp="this.minTemp"
              :iconId="this.iconId"
              :loading="this.loading"
              :infoTexts="this.infoTexts"
              :localTime="this.localTime"
              :degreeSymbol="this.degreeSymbol"
            />
          </div>
        </div>
            <Details
              :clouds="this.clouds"
              :uvi="this.uvi"
              :humidity="this.humidity"
              :pressure="this.pressure"
              :visibility="this.visibility"
              :dewPoint="this.dewPoint"
              :aqi="this.aqi"
              :slp="this.slp"
              :detailDataTexts="this.detailDataTexts"
            />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar";
import MainInfo from "./components/MainInfo";
import Details from "./components/Details";
import { dataVue } from "./dataVue";
import { methodsVue } from "./methodsVue";
export default {
  name: "App",
  components: {
    SearchBar,
    MainInfo,
    Details
  },
  data() {
    return dataVue;
  },
  methods: methodsVue,
  mounted() {
    this.locateUserPosttion();
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "../node_modules/font-awesome/css/font-awesome.min.css";
@import "./assets/css/owfont-regular.min.css";
@import "./assets/css/styles.css";
</style>
