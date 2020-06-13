<template>
  <div>
    <div class="search-bar-container">
      <input type="text" class="search-bar" placeholder="Find a city" />
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
    background: none;
    border: #c26146 1px solid;
    padding: 5px;
    border-radius: 0 10px 0 10px;
    transition: all ease 0.3s;
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