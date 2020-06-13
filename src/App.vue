<template>
  <div id="app" class="bg-container">
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <SearchBar />
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <MainInfo
              :city="this.city"
              :country="this.country"
              :condition="this.condition"
              :conditionDes="this.conditionDes"
              :mainTemp="this.mainTemp"
              :feelsLikeTemp="this.feelsLikeTemp"
              :maxTemp="this.maxTemp"
              :minTemp="this.minTemp"
              :iconId="this.iconId"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <Details
              :clouds="this.clouds"
              :uvi="this.uvi"
              :humidity="this.humidity"
              :pressure="this.pressure"
              :visibility="this.visibility"
              :dewPoint="this.dewPoint"
            />
          </div>
        </div>
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
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "./assets/css/owfont-regular.min.css";
@import "./assets/css/styles.css";
</style>
