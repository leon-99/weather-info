<template>
  <div class="footer text-center mt-5">
    <p class="d-inline-block">&copy; {{ currentYear }} Leon Made with</p>
    <img src="../assets/heart.svg" class="footer-heart animation-breath" />
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["currentYear"]
};
</script>

<style scoped>
.footer {
  padding-bottom: 10px;
  color: white;
}
p {
  margin: 0;
}
.footer-heart {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-bottom: 5px;
}
</style>