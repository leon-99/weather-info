<template>
  <div class="details-container">
    <div class="details-info-container">
      <v-row class="details-info-line-1 pb-3">
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon animation-translateX-5px-2s">mdi-cloud</v-icon>
            <p>Clouds</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts">{{ clouds }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon animation-rotate-360-3s">mdi-weather-sunny</v-icon>
            <p>UV Index</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts">{{ uvi }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon animation-translateY-5px-3s">mdi-water</v-icon>
            <p>Humidity</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts">{{ humidity }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon">mdi-gauge</v-icon>
            <p>Pressure</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts">{{ pressure }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon animation-colorChange">mdi-eye</v-icon>
            <p>Visibility</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts" class="visibility-data">{{ visibility }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon animation-scale-13-3s" :class="aqiColor">mdi-lungs</v-icon>
            <p>Air Quality</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts">{{ aqi }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon animation-scaleY">mdi-water</v-icon>
            <p>Sea Level</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts">{{ slp }}</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="detail-containers">
            <v-icon class="detail-icon animation-translateY-5px-3s">mdi-thermometer</v-icon>
            <p>Dew Point</p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
            <p v-if="detailDataTexts" class="data-text">
              {{ dewPoint }}{{ degreeSymbol }}
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
defineProps([
  "clouds",
  "uvi",
  "humidity",
  "pressure",
  "visibility",
  "dewPoint",
  "aqi",
  "slp",
  "detailDataTexts",
  "degreeSymbol",
  "aqiColor",
  "aqiColorBar",
  "aqiConText",
  "loading"
]);
</script>

<style scoped>
.details-container {
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  border-radius: 10px;
  transition: all ease 0.3s;
}

.details-info-line-1 {
  justify-content: center;
  color: white;
  text-align: center;
}

.detail-containers {
  margin: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 10px;
  border-radius: 10px;
  font-size: large;
  margin-bottom: 10px;
}

.detail-icon {
  font-size: 2rem;
  margin-bottom: 10px;
  color: white;
}

.aqi-green {
  color: rgba(127, 255, 0, 0.7);
}

.aqi-yellow {
  color: rgba(255, 255, 0, 0.7);
}

.aqi-orange {
  color: rgba(255, 69, 0, 0.7);
}

.aqi-red {
  color: rgba(255, 0, 0, 0.7);
}

.aqi-purple {
  color: rgba(128, 0, 128, 0.7);
}

.aqi-brown {
  color: rgba(165, 42, 42, 0.7);
}

@media screen and (max-width: 396px) {
  .details-info-line-1 {
    justify-content: space-evenly;
  }
}
</style>