<template>
  <div>
    <div class="main-info-container">
      <div class="city-name-container">
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <h3 v-if="infoTexts" class="city-name">
          <span>{{ city }}</span>,
          <span>{{ stateCode }}</span>
          <span>{{ country }}</span>
        </h3>
        <h6 v-if="infoTexts">{{ time }}</h6>
        <p class="alert-title" v-if="alertTitleText" @click="$emit('show-single-alert-function')">
          <span>
            <i class="fas fa-exclamation-circle"></i>
          </span>
          {{ alertTitle }}
        </p>
        <p
          class="alert-title"
          v-if="multipleAlertsTitleText"
          @click="$emit('show-multiple-alerts-function')"
        >
          <span>
            <i class="fas fa-exclamation-circle"></i>
          </span>
          {{ multipleAlertsTitle }}
        </p>
      </div>
      <div class="icon-container">
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        <i class="owf owf-4x" :class="iconId" v-if="infoTexts"></i>
        <h4 class="my-2" v-if="infoTexts">{{ condition }}</h4>
      </div>
      <div class="main-temp-container">
        <div class="main-temp">
          <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
          </div>
          <h2 v-if="infoTexts" class="main-temp" @click="$emit('change-units-function')">
            <span>{{mainTemp}}</span>
          </h2>
          <h5 class="__my2" v-if="infoTexts">
            Feels like
            <span>{{ feelsLikeTemp }}</span>
          </h5>
          <h5 class="mt-5">
            <span>
              <img
                src="../assets/pinmill.svg"
                alt
                class="windmill animation-rotate-windmill"
                :style="{animationDuration: windmillSpeed}"
              />
            </span>
            Wind {{ windSpeed }}
            <i
              class="fas fa-long-arrow-alt-down wind-degree-arrow ml-2"
              :style="{transform: 'rotate(' + windDegree + 'deg)'}"
            ></i>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainInfo",
  props: [
    "time",
    "iconId",
    "city",
    "stateCode",
    "country",
    "condition",
    "mainTemp",
    "feelsLikeTemp",
    "loading",
    "infoTexts",
    "degreeSymbol",
    "alertTitleText",
    "alertTitle",
    "multipleAlertsTitle",
    "multipleAlertsTitleText",
    "windSpeed",
    "windDir",
    "windDegree",
    "windmillSpeed",
  ],
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
  cursor: pointer;
}
.city-name {
  margin-bottom: 20px;
}

.alert-title {
  color: white;
  background-color: rgba(255, 0, 0, 0.5);
  letter-spacing: 1px;
  font-size: small;
  padding: 5px 10px;
  cursor: pointer;
}

.wind-degree-arrow {
  transition: transform cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s;
}

.windmill {
  vertical-align: middle;
  height: 40px;
}
</style>