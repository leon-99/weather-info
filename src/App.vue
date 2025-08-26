<template>
  <div id="app" class="bg-container" :class="bgImage">
      <div class="bg-container-inner">
        <!-- Single Alert Dialog -->
        <v-dialog v-model="showSingleAlertDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-warning text-center">
              {{ alertTitle }}
            </v-card-title>
            <v-card-text>
              <p>{{ alertBody }}</p>
              <br />
              <p class="text-center">Regions</p>
              <p>{{ alertRegions }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="closeSingleAlert">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Multiple Alerts Dialog -->
        <v-dialog v-model="showMultipleAlertsDialog" max-width="600px">
          <v-card>
            <v-card-title class="text-center">
              {{ multipleAlertsTitle }}
            </v-card-title>
            <v-card-text>
              <div v-for="alert in multipleAlertsArray" :key="multipleAlertsArray.indexOf(alert)">
                <p class="text-warning text-center">{{ alert.title }}</p>
                <p>{{ alert.description }}</p>
                <br />
                <p class="text-center">Regions</p>
                <p>{{ alert.regions.toString().split(',').join(', ') }}</p>
                <v-divider class="my-3" v-if="multipleAlertsArray.indexOf(alert) < multipleAlertsArray.length - 1"></v-divider>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="closeMultipleAlerts">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="main">
          <div class="container">
            <v-row>
              <v-col cols="12">
                <SearchBar @getSearchedDataFunction="handleSearch" />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="4" class="text-center mt-3">
                <MainInfo
                  @show-single-alert-function="showSingleAlert"
                  @show-multiple-alerts-function="showMultipleAlerts"
                  @change-units-function="handleUnitChange"
                  :time="time"
                  :city="details.city"
                  :stateCode="details.stateCode"
                  :country="details.country"
                  :condition="details.condition"
                  :mainTemp="details.mainTemp"
                  :feelsLikeTemp="details.feelsLikeTemp"
                  :iconId="details.iconId"
                  :loading="loading"
                  :infoTexts="infoTexts"
                  :alertTitleText="alertTitleText"
                  :alertTitle="alertTitle"
                  :multipleAlertsTitle="multipleAlertsTitle"
                  :multipleAlertsTitleText="multipleAlertsTitleText"
                  :degreeSymbol="details.degreeSymbol"
                  :windSpeed="details.windSpeed"
                  :windDir="details.windDir"
                  :windDegree="windDegree"
                  :windmillSpeed="windmillSpeed"
                />
              </v-col>
              <v-col cols="12" md="8" class="mt-5">
                <Details
                  :loading="loading"
                  :clouds="details.clouds"
                  :uvi="details.uvi"
                  :humidity="details.humidity"
                  :pressure="details.pressure"
                  :visibility="details.visibility"
                  :dewPoint="details.dewPoint"
                  :aqi="details.aqi"
                  :slp="details.slp"
                  :detailDataTexts="detailDataTexts"
                  :degreeSymbol="details.degreeSymbol"
                  :aqiColor="aqiColor"
                />
              </v-col>
            </v-row>
            <Footer :currentYear="currentYear" />
          </div>
        </div>
      </div>
         </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBar from "./components/SearchBar.vue"
import MainInfo from "./components/MainInfo.vue"
import Details from "./components/Details.vue"
import Footer from "./components/Footer.vue"

// Import composables
import { useWeather } from '@/composables/useWeather'
import { useUnitConversion } from '@/composables/useUnitConversion'
import { useLocation } from '@/composables/useLocation'
import { useDialogs } from '@/composables/useDialogs'

// Initialize composables
const {
  loading,
  infoTexts,
  detailDataTexts,
  bgImage,
  aqiColor,
  windDegree,
  windmillSpeed,
  time,
  alertTitleText,
  alertTitle,
  alertBody,
  alertRegions,
  multipleAlertsTitleText,
  multipleAlertsTitle,
  multipleAlertsArray,
  details,
  getWeatherByCity,
  getWeatherByCoords
} = useWeather()

const { changeUnits } = useUnitConversion()
const { locateUserPosition } = useLocation()
const {
  showSingleAlertDialog,
  showMultipleAlertsDialog,
  showSingleAlert,
  closeSingleAlert,
  showMultipleAlerts,
  closeMultipleAlerts
} = useDialogs()

// Current year
const currentYear = ref(null)

// Handle search from SearchBar component
const handleSearch = (e) => {
  if (e.target.firstChild.value) {
    getWeatherByCity(e.target.firstChild.value)
  }
}

// Handle unit conversion
const handleUnitChange = () => {
  changeUnits(details)
}

// Get current year
const getCurrentYear = () => {
  const date = new Date()
  currentYear.value = date.getFullYear()
}

// Handle user location and get weather
const handleUserLocation = async () => {
  try {
    const position = await locateUserPosition()
    await getWeatherByCoords(position)
      } catch (error) {
      console.error('Failed to get user location:', error.message || error)
      // Fallback to a default city when location fails
      console.log('Falling back to default city: London')
      await getWeatherByCity('London')
    }
}

// Lifecycle hooks
onMounted(async () => {
  getCurrentYear()
  await handleUserLocation()
})
</script>

<style>
@import "./assets/css/styles.css";
@import "./assets/css/animations.css";
</style>
