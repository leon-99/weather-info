<template>
  <div class="details-container">
    <div class="details-info-container">
      <div class="details-info-line-1">
        <div class="clouds-container detail-containers">
          <p>Clouds</p>
          <p v-if="detailDataTexts">{{ clouds }}%</p>
        </div>
        <div class="humid-container detail-containers">
           <i class="fas fa-map-marker-alt"></i>
          <p>UV Index</p>
          <p v-if="detailDataTexts">{{ uvi }}</p>
        </div>
      </div>
      <div class="details-info-line-2">
        <div class="uvi-container detail-containers">
          <p>Humidity</p>
          <p v-if="detailDataTexts">{{ humidity }}%</p>
        </div>
        <div class="pressure-container detail-containers">
          <p>Pressure</p>
          <p v-if="detailDataTexts">{{ pressure }}mb</p>
        </div>
      </div>
      <div class="details-info-line-3">
        <div class="visibility-container detail-containers">
          <p>Visibility</p>
          <p v-if="detailDataTexts" class="visibility-data">{{ visibility }}</p>
        </div>
        <div class="dew-container detail-containers">
          <p>Dew Point</p>
          <p v-if="detailDataTexts">{{ dewPoint }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: ['clouds', 'uvi', 'humidity', 'pressure', 'visibility', 'dewPoint', 'detailDataTexts']
};
</script>

<style scoped>
.details-container {
  min-height: 50vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.details-info-container {
    display: flex;
    flex-direction: column;
}
.details-info-line-1, .details-info-line-2, .details-info-line-3 {
    display: flex;
    justify-content: space-around;
    color: white;
    text-align: center;
}
.detail-containers {
    margin: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 10px 25px;
    border-radius: 10px;
    min-height: 100px;
    font-size: large;
}

@media screen and (max-width: 396px) {
  .visibility-data {
    margin-top: 40px;
  }
}
</style>