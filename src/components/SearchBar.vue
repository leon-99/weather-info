<template>
  <div>
    <div class="search-bar-container">
      <form @submit.prevent="$emit('getSearchedDataFunction', $event)">
        <input type="text" class="search-bar" placeholder="Find a city" />
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.search-bar-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.search-bar {
  background: rgba(0, 0, 0, 0.3);
  border: rgba(0, 0, 0, 0.3) 1px solid;
  padding: 5px;
  border-radius: 0 10px 0 10px;
  transition: all linear 0.3s;
  color: white;
  text-align: center;
}
.search-bar:focus {
  outline: none;
  border-color: white;
}
.search-bar::placeholder {
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}
</style>