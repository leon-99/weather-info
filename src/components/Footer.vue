<template>
  <div class="text-center mt-5 text-white">
    <p class="d-inline-block mb-0">&copy; {{ currentYear }} Leon Made with</p>
    <img src="../assets/heart.svg" class="footer-heart animation-breath" />
  </div>
</template>

<script setup>
defineProps(["currentYear"]);
</script>

<style scoped>
.footer-heart {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-bottom: 5px;
}
</style>