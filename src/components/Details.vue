<template>
  <div class="details-container">
    <div class="details-info-container">
      <div class="details-info-line-1 row">
        <div class="clouds-container detail-containers col-md-2 col-3">
          <i class="fas fa-cloud"></i>
          <p>Clouds</p>
          <p v-if="detailDataTexts">{{ clouds }}%</p>
        </div>
        <div class="humid-container detail-containers col-md-2 col-3">
          <i class="far fa-sun"></i>
          <p>UV Index</p>
          <p v-if="detailDataTexts">{{ uvi }}</p>
        </div>
        <div class="uvi-container detail-containers col-md-2 col-3">
          <i class="fas fa-tint"></i>
          <p>Humidity</p>
          <p v-if="detailDataTexts">{{ humidity }}%</p>
        </div>
        <div class="pressure-container detail-containers col-md-2 col-3">
          <i class="fas fa-tachometer-alt"></i>
          <p>Pressure</p>
          <p v-if="detailDataTexts">{{ pressure }}mb</p>
        </div>
      </div>
      <div class="details-info-line-2 row">
        <div class="visibility-container detail-containers col-md-2 col-3">
          <i class="fas fa-eye"></i>
          <p>Visibility</p>
          <p v-if="detailDataTexts" class="visibility-data">{{ visibility }}</p>
        </div>
        <div class="dew-container detail-containers col-md-2 col-3">
          <i class="fas fa-lungs"></i>
          <p>Air Quality</p>
          <p v-if="detailDataTexts">{{ aqi }}</p>
          <hr class="hr" :class="aqiColor">
        </div>
        <div class="dew-container detail-containers col-md-2 col-3">
          <i class="fas fa-water"></i>
          <p>Sea Level</p>
          <p v-if="detailDataTexts">{{ slp }}</p>
        </div>
        <div class="dew-container detail-containers col-md-2 col-3">
          <i class="fas fa-tint"></i>
          <p>Dew Point</p>
          <p v-if="detailDataTexts" class="data-text">{{ dewPoint }}<span>{{ degreeSymbol }}</span></p>
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

.hr {
  width: 50px;
  height: 10px;
}

.aqi-green {
  background-color: chartreuse;
}

.aqi-yellow {
  background-color: yellow;
}

.aqi-orange {
  background-color: orangered;
}

.aqi-red {
  background-color: red;
}

.aqi-purple {
  background-color: purple;
}

.aqi-brown {
  background-color: brown;
}

@media screen and (max-width: 396px) {
  .visibility-data {
    margin-top: 40px;
  }

  .detail-containers {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>