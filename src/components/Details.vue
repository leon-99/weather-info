<template>
  <div class="details-container">
    <div class="details-info-container">
      <div class="details-info-line-1 row">
        <div class="clouds-container detail-containers col-md-2 col-4">
          <i class="fas fa-cloud animation-translateX-5px-2s"></i>
          <p>Clouds</p>
          <p v-if="detailDataTexts">{{ clouds }}%</p>
        </div>
        <div class="humid-container detail-containers col-md-2 col-4">
          <i class="far fa-sun animation-rotate-360-3s"></i>
          <p>UV Index</p>
          <p v-if="detailDataTexts">{{ uvi }}</p>
        </div>
        <div class="uvi-container detail-containers col-md-2 col-4">
          <i class="fas fa-tint animation-translateY-5px-3s"></i>
          <p>Humidity</p>
          <p v-if="detailDataTexts">{{ humidity }}%</p>
        </div>
        <div class="pressure-container detail-containers col-md-2 col-4">
          <i class="fas fa-tachometer-alt"></i>
          <p>Pressure</p>
          <p v-if="detailDataTexts">{{ pressure }}mb</p>
        </div>
      </div>
      <div class="details-info-line-2 row">
        <div class="visibility-container detail-containers col-md-2 col-4">
          <i class="fas fa-eye animation-colorChange"></i>
          <p>Visibility</p>
          <p v-if="detailDataTexts" class="visibility-data">{{ visibility }}</p>
        </div>
        <div class="dew-container detail-containers col-md-2 col-4">
          <i class="fas fa-lungs animation-scale-13-3s" :class="aqiColor"></i>
          <p>Air Quality</p>
          <p v-if="detailDataTexts">{{ aqi }}</p>
          <!-- <hr class="aqi-color" :class="aqiColor" /> -->
        </div>
        <div class="dew-container detail-containers col-md-2 col-4">
          <i class="fas fa-water animation-scaleY"></i>
          <p>Sea Level</p>
          <p v-if="detailDataTexts">{{ slp }}</p>
        </div>
        <div class="dew-container detail-containers col-md-2 col-4">
          <i class="fas fa-tint animation-translateY-5px-3s"></i>
          <p>Dew Point</p>
          <p v-if="detailDataTexts" class="data-text">
            {{ dewPoint }}
            <span>{{ degreeSymbol }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: [
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
    "aqiConText"
  ]
};
</script>

<style scoped>
.details-container {
  min-height: 50vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  border-radius: 10px;
  transition: all ease 0.3s;
}

.details-info-line-1,
.details-info-line-2,
.details-info-line-3 {
  justify-content: space-around;
  color: white;
  text-align: center;
}
.detail-containers {
  margin: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 10px;
  min-height: 100px;
  font-size: large;
}

.aqi-color {
  width: 50px;
  height: 10px;
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
  .details-info-line-1,
  .details-info-line-2,
  .details-info-line-3 {
    justify-content: space-evenly;
  }
  .aqi-color {
    margin: 0px;
  }
}
</style>