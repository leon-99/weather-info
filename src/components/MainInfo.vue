<template>
  <div>
    <div class="main-info-container">
      <div class="city-name-container">
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <h3 v-if="infoTexts" class="city-name">
          <span>{{ city }}</span>,
          <span>{{ country }}</span>
        </h3>
        <h5>{{ localTime }}</h5>
      </div>
      <div class="icon-container">
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <i class="owf owf-4x" :class="iconId" v-if="infoTexts"></i>
        <h4 class="__my2" v-if="infoTexts">{{ condition }}</h4>
        <h5 v-if="infoTexts">{{ conditionDes }}</h5>
      </div>
      <div class="main-temp-container">
        <div class="main-temp">
          <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
          </div>
          <h2 v-if="infoTexts" class="main-temp">
            <span class="__fonted-text">{{mainTemp}}</span>&#8451;
          </h2>
          <h5 class="__my2" v-if="infoTexts">
            Feels like
            <span>{{ feelsLikeTemp }}</span>℃
          </h5>
        </div>
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="max-min-temp">
          <p v-if="infoTexts">
            Max
            <span>
              <span>{{ maxTemp }}</span> ℃
            </span> / Min
            <span>
              <span>{{ minTemp }}</span> ℃
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainInfo",
  props: [
    "city",
    "country",
    "condition",
    "conditionDes",
    "mainTemp",
    "feelsLikeTemp",
    "maxTemp",
    "minTemp",
    "iconId",
    "loading",
    "infoTexts",
    "localTime"
  ]
};
</script>

<style scoped>
.main-info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  color: white;
}
.icon-container {
  margin-bottom: 20px;
  margin-top: 10px;
}
.icon-container {
  margin-bottom: 50px;
  margin-top: 50px;
}
.__my2 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.spinner-border {
  margin-top: 30px;
  margin-bottom: 35px;
}
.main-temp {
  font-size: 50px;
}
.city-name {
  margin-bottom: 20px;
}
</style>