<template>
  <div>
    <div class="main-info-container">
      <div class="city-name-container">
        <h3>
          <span>{{ city }}</span>
          , {{ country }}
        </h3>
      </div>
      <div class="icon-container">
        <i class="owf owf-4x" :class="iconId"></i>
        <h4 class="__my2">{{ condition }}</h4>
        <h5>{{ conditionDes }}</h5>
      </div>
      <div class="main-temp-container">
        <div class="main-temp">
          <h2>
            <span>{{mainTemp}}</span>℃
          </h2>
          <h5 class="__my2">
            Feels like
            <span>{{ feelsLikeTemp }}</span>℃
          </h5>
        </div>
        <div class="max-min-temp">
          <p>
            Max
            <span><span>{{ maxTemp }}</span> ℃</span> / Min
            <span><span>{{ minTemp }}</span> ℃</span>
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
    "iconId"
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
</style>