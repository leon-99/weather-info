<template>
  <simplebar data-simplebar-auto-hide="false">
    <div id="app" class="bg-container" :class="bgImage">
      <div class="bg-container-inner">
        <modal
          name="single-alert"
          class="alert-modal"
          height="auto"
          :adaptive="true"
          :scrollable="true"
          styles="background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px;
      letterSpacing: 1px;
      "
        >
          <p class="text-warning text-center">{{ alertTitle }}</p>
          <p>{{ alertBody }}</p>
          <br />
          <p class="text__center">Regions</p>
          <p>{{ alertRegions }}</p>
          <button class="close-single-alert-btn" @click="closeSingleAlert">Close</button>
        </modal>
        <modal
          name="multiple-alerts"
          class="alert-modal"
          height="auto"
          :adaptive="true"
          :scrollable="true"
          styles="background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px;
      letterSpacing: 1px;
      "
        >
          <div v-for="alert in multipleAlertsArray" :key="multipleAlertsArray.indexOf(alert)">
            <p class="text-warning text__center">{{ alert.title }}</p>
            <p>{{ alert.description }}</p>
            <br />
            <p class="text__center">Regions</p>
            <p>{{ alert.regions.toString().split(',').join(', ') }}</p>
            <hr class="hr" />
          </div>
          <button class="close-single-alert-btn" @click="closeMultipleAlerts">Close</button>
        </modal>
        <div class="main">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <SearchBar @getSearchedDataFunction="getSearchedData" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-center mt-3">
                <MainInfo
                  @showSingleAlertFunction="showSingleAlert"
                  @showMultipleAlertsFunction="showMultipleAlerts"
                  @changeDegreeFunction="changeDegree"
                  :time="this.time"
                  :city="this.details.city"
                  :country="this.details.country"
                  :condition="this.details.condition"
                  :mainTemp="this.details.mainTemp"
                  :feelsLikeTemp="this.details.feelsLikeTemp"
                  :iconId="this.details.iconId"
                  :loading="this.loading"
                  :infoTexts="this.infoTexts"
                  :alertTitleText="this.alertTitleText"
                  :alertTitle="this.alertTitle"
                  :multipleAlertsTitle="this.multipleAlertsTitle"
                  :multipleAlertsTitleText="this.multipleAlertsTitleText"
                  :degreeSymbol="this.details.degreeSymbol"
                  :windSpeed="this.details.windSpeed"
                  :windDir="this.details.windDir"
                  :windDegree="this.windDegree"
                />
              </div>
              <div class="col-md-8 mt-5">
                <Details
                  :loading="this.loading"
                  :clouds="this.details.clouds"
                  :uvi="this.details.uvi"
                  :humidity="this.details.humidity"
                  :pressure="this.details.pressure"
                  :visibility="this.details.visibility"
                  :dewPoint="this.details.dewPoint"
                  :aqi="this.details.aqi"
                  :slp="this.details.slp"
                  :detailDataTexts="this.detailDataTexts"
                  :degreeSymbol="this.details.degreeSymbol"
                  :aqiColor="this.aqiColor"
                />
              </div>
            </div>
            <Footer :currentYear="this.currentYear" />
          </div>
        </div>
      </div>
    </div>
  </simplebar>
</template>

<script>
import simplebar from "simplebar-vue";
import SearchBar from "./components/SearchBar";
import MainInfo from "./components/MainInfo";
import Details from "./components/Details";
import Footer from "./components/Footer";
import { dataVue } from "./dataVue";
import { methodsVue } from "./methodsVue";
export default {
  name: "App",
  components: {
    SearchBar,
    MainInfo,
    Details,
    Footer,
    simplebar,
  },
  data() {
    return dataVue;
  },
  methods: methodsVue,
  mounted() {
    this.locateUserPosition();
    this.getCurrentYear();
  },
};
</script>

<style>
@import '../node_modules/simplebar/dist/simplebar.min.css';
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "../node_modules/font-awesome/css/font-awesome.min.css";
@import "./assets/css/owfont-regular.min.css";
@import "./assets/css/styles.css";
@import "./assets/css/animations.css";
</style>
