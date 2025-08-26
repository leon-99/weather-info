<template>
  <div class="d-flex flex-column align-center justify-space-between mt-12 text-white">
    <div class="city-name-container text-center mb-8">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="white"
        size="40"
      ></v-progress-circular>
      <h3 v-if="infoTexts" class="text-h4 mb-4">
        <span>{{ city }}</span>,
        <span>{{ stateCode }}</span>
        <span>{{ country }}</span>
      </h3>
      <h6 v-if="infoTexts" class="text-h6">{{ time }}</h6>
      <v-chip
        v-if="alertTitleText"
        color="error"
        variant="elevated"
        class="mt-3 cursor-pointer"
        @click="$emit('show-single-alert-function')"
      >
        <v-icon start>mdi-alert-circle</v-icon>
        {{ alertTitle }}
      </v-chip>
      <v-chip
        v-if="multipleAlertsTitleText"
        color="error"
        variant="elevated"
        class="mt-3 cursor-pointer"
        @click="$emit('show-multiple-alerts-function')"
      >
        <v-icon start>mdi-alert-circle</v-icon>
        {{ multipleAlertsTitle }}
      </v-chip>
    </div>
    
    <div class="icon-container text-center mb-12">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="white"
        size="40"
      ></v-progress-circular>
      <v-icon 
        v-if="infoTexts" 
        :icon="iconId" 
        size="64" 
        color="white"
        class="my-4"
      ></v-icon>
      <h4 class="my-4" v-if="infoTexts">{{ condition }}</h4>
    </div>
    
    <div class="main-temp-container text-center">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="white"
        size="40"
      ></v-progress-circular>
      <h2 v-if="infoTexts" class="text-h1 cursor-pointer" @click="$emit('change-units-function')">
        <span>{{mainTemp}}</span>
      </h2>
      <h5 class="text-h6 my-4" v-if="infoTexts">
        Feels like
        <span>{{ feelsLikeTemp }}</span>
      </h5>
      <h5 class="text-h6 mt-4">
        <span>
          <img
            src="../assets/pinmill.svg"
            alt="windmill"
            class="windmill animation-rotate-windmill"
            :style="{animationDuration: windmillSpeed}"
          />
        </span>
        Wind {{ windSpeed }}
        <v-icon
          class="wind-degree-arrow ml-2"
          :style="{transform: 'rotate(' + windDegree + 'deg)'}"
        >
          mdi-arrow-down
        </v-icon>
      </h5>
    </div>
  </div>
</template>

<script setup>
defineProps([
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
]);

defineEmits([
  'show-single-alert-function',
  'show-multiple-alerts-function',
  'change-units-function'
]);
</script>

<style scoped>
.cursor-pointer {
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